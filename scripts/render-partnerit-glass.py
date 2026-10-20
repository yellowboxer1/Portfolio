"""Build the actual PartnerIT vector mark in Blender and render its glass motion.

Run with Blender --background --factory-startup --python this_file -- preview|animate.
Only writes inside the portfolio workspace. No external assets or add-ons required.
"""
import math
import re
import sys
from pathlib import Path
import xml.etree.ElementTree as ET

import bpy
import numpy as np
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tmp/partnerit-glass-final"
OUT.mkdir(parents=True, exist_ok=True)
MODE = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "preview"
MOTION_FRAMES = 64
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)


def svg_contour(data):
    tokens = re.findall(r"[MLCZ]|-?\d*\.?\d+(?:[eE][-+]?\d+)?", data)
    points, position, command, i = [], (0, 0), None, 0
    while i < len(tokens):
        if tokens[i] in ("M", "L", "C", "Z"):
            command = tokens[i]
            i += 1
            if command == "Z":
                break
        if command in ("M", "L"):
            position = tuple(float(t) for t in tokens[i:i + 2])
            points.append(position)
            i += 2
            command = "L"
        elif command == "C":
            values = [float(t) for t in tokens[i:i + 6]]
            a, b, c, d = position, values[:2], values[2:4], values[4:]
            for step in range(1, 33):
                t = step / 32
                points.append(tuple((1-t)**3*a[k] + 3*(1-t)**2*t*b[k] + 3*(1-t)*t*t*c[k] + t**3*d[k] for k in range(2)))
            position = tuple(d)
            i += 6
        else:
            raise ValueError(f"Unsupported SVG command: {command}")
    return points



material = bpy.data.materials.new("Optical violet glass")
material.use_nodes = True
bsdf = material.node_tree.nodes.get("Principled BSDF")
bsdf.inputs["Base Color"].default_value = (0.32, 0.025, 0.68, 1)
bsdf.inputs["Metallic"].default_value = 0.08
bsdf.inputs["Roughness"].default_value = 0.045
bsdf.inputs["IOR"].default_value = 1.48
bsdf.inputs["Transmission Weight"].default_value = .985
bsdf.inputs["Coat Weight"].default_value = 0.35
bsdf.inputs["Coat Roughness"].default_value = 0.055

rig = bpy.data.objects.new("PartnerIT mark motion", None)
bpy.context.collection.objects.link(rig)
root = ET.parse(ROOT / "public/portfolio/partnerit/visuals/partnerit-mark.svg").getroot()
for path in root.iter("{http://www.w3.org/2000/svg}path"):
    if path.attrib.get("id") not in ("Mark_Link01", "Mark_Link02"):
        continue
    raw = svg_contour(path.attrib["d"])
    contour = [((x-96)/29, (96-y)/29) for x, y in raw]
    curve = bpy.data.curves.new(path.attrib["id"], "CURVE")
    curve.dimensions = "2D"
    curve.fill_mode = "BOTH"
    curve.extrude = 0.19
    curve.bevel_depth = .11
    curve.bevel_resolution = 6
    spline = curve.splines.new("POLY")
    spline.points.add(len(contour) - 1)
    for point, (x, y) in zip(spline.points, contour):
        point.co = (x, y, 0, 1)
    spline.use_cyclic_u = True
    obj = bpy.data.objects.new("PartnerIT " + path.attrib["id"], curve)
    bpy.context.collection.objects.link(obj)
    obj.parent = rig
    # Separate the crossing ribbons in depth, following the source vector overlap.
    obj.location.z = 0.13 if path.attrib["id"] == "Mark_Link01" else -0.13
    obj.data.materials.append(material)

# Procedural studio reflection map: broad softboxes, narrow strips and a blue rim.
width, height = 1024, 512
u, v = np.meshgrid(np.linspace(0, 1, width), np.linspace(0, 1, height))
rgb = np.zeros((height, width, 3), dtype=np.float32) + 0.025
for cx, cy, sx, sy, color, power in [
    (.12, .52, .022, .23, (0.75, .42, 1), 6),
    (.35, .4, .07, .10, (.9, .94, 1), 4),
    (.62, .55, .016, .28, (.8, .7, 1), 7),
    (.8, .65, .09, .04, (.22, .4, 1), 4),
    (.94, .35, .018, .21, (1, .3, .8), 5),
    (.35, .78, .05, .025, (.8, .4, 1), 3),
]:
    distance = np.minimum(np.abs(u - cx), 1 - np.abs(u - cx))
    mask = np.exp(-((distance/sx)**6 + ((v-cy)/sy)**6))
    rgb += mask[..., None] * np.array(color) * power
pixels = np.ones((height, width, 4), dtype=np.float32)
pixels[..., :3] = rgb
env_image = bpy.data.images.new("Packed studio softbox reflections", width=width, height=height, float_buffer=True)
env_image.pixels.foreach_set(pixels.ravel())
env_image.pack()
world = bpy.data.worlds.new("Black stage with studio reflections")
bpy.context.scene.world = world
world.use_nodes = True
nodes, links = world.node_tree.nodes, world.node_tree.links
nodes.clear()
output = nodes.new("ShaderNodeOutputWorld")
environment = nodes.new("ShaderNodeTexEnvironment")
environment.image = env_image
lit = nodes.new("ShaderNodeBackground")
lit.inputs["Strength"].default_value = .8
black = nodes.new("ShaderNodeBackground")
black.inputs["Color"].default_value = (0, 0, 0, 1)
path = nodes.new("ShaderNodeLightPath")
mix = nodes.new("ShaderNodeMixShader")
links.new(environment.outputs["Color"], lit.inputs["Color"])
links.new(path.outputs["Is Camera Ray"], mix.inputs[0])
links.new(lit.outputs[0], mix.inputs[1])
links.new(black.outputs[0], mix.inputs[2])
links.new(mix.outputs[0], output.inputs[0])

for name, location, color, energy, size, size_y in [
    ("Tall violet softbox", (-3, 1, 4), (.7, .38, 1), 450, .65, 6),
    ("White rim strip", (3, 2, 3.5), (.84, .88, 1), 650, .45, 5),
    ("Pink edge strip", (1, -3, 2), (1, .25, .65), 300, 3, .4),
]:
    light_data = bpy.data.lights.new(name, "AREA")
    light_data.energy, light_data.color = energy, color
    light_data.shape, light_data.size, light_data.size_y = "RECTANGLE", size, size_y
    light = bpy.data.objects.new(name, light_data)
    bpy.context.collection.objects.link(light)
    light.location = location
    light.rotation_euler = (-light.location).to_track_quat("-Z", "Y").to_euler()

camera_data = bpy.data.cameras.new("Cover camera")
camera = bpy.data.objects.new("Cover camera", camera_data)
bpy.context.collection.objects.link(camera)
camera.location = (0, 0, 12)
camera.rotation_euler = (Vector((0, 0, 0)) - camera.location).to_track_quat("-Z", "Y").to_euler()
camera_data.type = "ORTHO"
camera_data.ortho_scale = 6.2
scene = bpy.context.scene
scene.camera = camera
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 32
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 10
scene.cycles.transmission_bounces = 8
scene.render.resolution_x = 768
scene.render.resolution_y = 768
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = False
scene.view_settings.view_transform = "AgX"
scene.render.fps = 16
scene.render.fps_base = 3
scene.render.use_persistent_data = True
scene.frame_start = 1
scene.frame_end = MOTION_FRAMES

def pose(frame):
    phase = 2 * math.pi * (frame - 1) / MOTION_FRAMES
    rig.rotation_euler = (
        math.radians(12 + 6 * math.sin(phase + .6)),
        math.radians(-16 + 27 * math.sin(phase)),
        math.radians(-10),
    )
    rig.location.y = .05 * math.sin(phase)

for frame in range(1, MOTION_FRAMES + 2):
    pose(frame)
    rig.keyframe_insert(data_path="rotation_euler", frame=frame)
    rig.keyframe_insert(data_path="location", frame=frame)
scene.frame_set(1)
pose(1)
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / "partnerit-glass.blend"))
if MODE == "animate":
    (OUT / "motion-frames-v2").mkdir(exist_ok=True)
    for frame in range(1, MOTION_FRAMES + 1):
        output_file = OUT / "motion-frames-v2" / f"{frame:04d}.png"
        if output_file.exists():
            continue
        scene.frame_set(frame)
        scene.render.filepath = str(output_file)
        bpy.ops.render.render(write_still=True)
else:
    scene.render.filepath = str(OUT / "preview.png")
    bpy.ops.render.render(write_still=True)
