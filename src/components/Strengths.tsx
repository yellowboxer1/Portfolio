"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";

type StrengthType = "video" | "execution" | "precision" | "default";

type BaseStrength = {
  id: number;
  type: StrengthType;
  title: string;
  subtitle: string;
  description: string;
};

type VideoStrength = BaseStrength & {
  type: "video";
  video: string;
};

type ExecutionStrength = BaseStrength & {
  type: "execution";
  icon: string;
  iconAlt: string;
};

type PrecisionStrength = BaseStrength & {
  type: "precision";
  icon: string;
};

type DefaultStrength = BaseStrength & {
  type: "default";
  icon: string;
  iconAlt?: string;
};

type Strength =
  | VideoStrength
  | ExecutionStrength
  | PrecisionStrength
  | DefaultStrength;

const strengths: Strength[] = [
  {
    id: 1,
    type: "video",
    video: "/screen/01.mp4",
    title: "STRATEGY",
    subtitle: "방향을 설계하는 기획력",
    description:
      "‘무엇을 만들 것인가’보다 ‘왜 만들어야 하는가’를 기준으로 판단합니다. 시장의 결핍을 파고들어 비즈니스 모델로 치환하는 전략적 사고는 입사 후 30억 규모의 대형 프로젝트 수주라는 확실한 결과로 이어졌습니다. 데이터와 사용자 흐름을 기반으로, 사업의 성패를 결정짓는 단단한 방향을 설계합니다.",
  },
  {
    id: 2,
    type: "video",
    video: "/screen/02.mp4",
    title: "CREATIVITY",
    subtitle: "문제를 새롭게 정의하는 창의력",
    description:
      "창의성은 화려함이 아닌, 익숙한 불편함에서 새로운 가치를 발견하는 힘입니다. 기술과 사용자의 맥락을 결합해 세상에 없던 해답을 제시합니다. 국내 최초 AI 기반 공고-컨소시엄 매칭 플랫폼과 시각·청각·촉각의 경계를 허무는 시각장애인 보행 보조 솔루션은 이러한 창의적 사유의 산물입니다.",
  },
  {
    id: 3,
    type: "execution",
    icon: "/main_icon01.png",
    iconAlt: "/main_icon02.png",
    title: "EXECUTION",
    subtitle: "결정을 결과로 연결하는 실행력",
    description:
      "설계된 구조를 빠르게 실행으로 전환합니다. 2주 단위 스크럼으로 기획–디자인–개발의 선순환 구조를 만들고, 프로토타입 기반의 빠른 검증으로 의사결정의 병목을 제거합니다. 이러한 추진력은 서비스 런칭을 넘어 전년 대비 매출 150% 성장과 영업이익 최초 흑자 전환이라는 실질적인 비즈니스 임팩트를 만들어냈습니다.",
  },
  {
    id: 4,
    type: "video",
    video: "/screen/main_object_video02.mp4",
    title: "PRECISION",
    subtitle: "신뢰의 깊이를 더하는 정교한 디테일",
    description:
      "성장은 보이지 않는 디테일에서 완성됩니다. 시스템 플로우, 어드민 구조, 알고리즘 로직까지 전 레이어를 직접 설계하고 검증합니다. 이러한 정교함은 부산 스마트시티 챌린지와 같은 300억 규모의 대형 컨소시엄 사업을 성공적으로 이끄는 근간이 되었습니다.",
  },
];

function useActiveVisualClass(isActive: boolean) {
  return cn(
    "relative w-full h-full transition-[transform,opacity,filter] duration-700 will-change-transform",
    isActive
      ? "scale-100 opacity-100 blur-0"
      : "scale-[0.94] opacity-35 grayscale blur-[1px]"
  );
}

function TiltVisual({
  children,
  isActive,
  className,
}: {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef({ rx: 0, ry: 0 });
  const targetRef = useRef({ rx: 0, ry: 0 });
  const [style, setStyle] = useState({
    transform:
      "perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
  });

  useEffect(() => {
    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.rx += (target.rx - current.rx) * 0.1;
      current.ry += (target.ry - current.ry) * 0.1;

      const next = `perspective(1400px) rotateX(${current.rx}deg) rotateY(${current.ry}deg) translateZ(0px)`;
      setStyle({ transform: next });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 10;

    targetRef.current = {
      rx,
      ry,
    };
  };

  const handleLeave = () => {
    targetRef.current = { rx: 0, ry: 0 };
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("relative w-full h-full", className)}
      style={style}
    >
      {children}
    </div>
  );
}

function VideoVisual({
  src,
  isActive,
}: {
  src: string;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <TiltVisual isActive={isActive}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className={cn(
          "w-full h-full object-cover rounded-[22px] transition-all duration-700 will-change-transform",
          isActive ? "opacity-100 scale-100" : "opacity-35 scale-[0.95]"
        )}
      />
    </TiltVisual>
  );
}

function ExecutionVisual({
  strength,
  isActive,
}: {
  strength: ExecutionStrength;
  isActive: boolean;
}) {
  return (
    <TiltVisual isActive={isActive}>
      <div className="relative w-full h-full execution-stage">
        <Image
          src={strength.icon}
          alt={`${strength.title} icon 1`}
          fill
          className={cn(
            "object-contain transition-all duration-1000 will-change-transform",
            isActive
              ? "execution-rotor execution-rotor-back opacity-90"
              : "scale-[0.88] opacity-40"
          )}
        />

        <Image
          src={strength.iconAlt}
          alt={`${strength.title} icon 2`}
          fill
          className={cn(
            "object-contain transition-all duration-1000 will-change-transform",
            isActive
              ? "execution-rotor execution-rotor-front opacity-100"
              : "scale-100 opacity-55"
          )}
        />

        <div
          className={cn(
            "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-1000",
            isActive ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0.03) 35%, transparent 72%)",
            filter: "blur(10px)",
          }}
        />
      </div>
    </TiltVisual>
  );
}

function PrecisionVisual({
  strength,
  isActive,
}: {
  strength: PrecisionStrength;
  isActive: boolean;
}) {
  return (
    <TiltVisual isActive={isActive}>
      <div className="relative w-full h-full flex items-center justify-center">
        <span
          className={cn(
            "absolute top-5 left-3 w-8 h-8 rounded-full border transition-all duration-700",
            isActive
              ? "border-white/30 scale-100"
              : "border-white/10 scale-90"
          )}
        />

        <Image
          src={strength.icon}
          alt={strength.title}
          fill
          className="object-contain p-4"
        />

        <span
          className={cn(
            "absolute right-5 bottom-5 w-14 h-14 rounded-full border transition-all duration-700",
            isActive
              ? "border-white/20 scale-100"
              : "border-white/10 scale-90"
          )}
        />
      </div>
    </TiltVisual>
  );
}

function DefaultVisual({
  strength,
  isActive,
}: {
  strength: DefaultStrength;
  isActive: boolean;
}) {
  return (
    <TiltVisual isActive={isActive}>
      <div className="relative w-full h-full">
        <Image
          src={strength.icon}
          alt={strength.title}
          fill
          className="object-contain"
        />
      </div>
    </TiltVisual>
  );
}

function StrengthVisual({
  strength,
  isActive,
}: {
  strength: Strength;
  isActive: boolean;
}) {
  const visualClass = useActiveVisualClass(isActive);

  return (
    <div className={visualClass}>
      {strength.type === "video" && (
        <VideoVisual src={strength.video} isActive={isActive} />
      )}

      {strength.type === "execution" && (
        <ExecutionVisual strength={strength} isActive={isActive} />
      )}

      {strength.type === "precision" && (
        <PrecisionVisual strength={strength} isActive={isActive} />
      )}

      {strength.type === "default" && (
        <DefaultVisual strength={strength} isActive={isActive} />
      )}
    </div>
  );
}

export default function Strengths() {
  const [activeId, setActiveId] = useState<number>(strengths[0].id);
  const itemRefs = useRef<Record<number, HTMLLIElement | null>>({});

  const strengthIds = useMemo(() => strengths.map((item) => item.id), []);

  useEffect(() => {
    const updateActiveItem = () => {
      const viewportCenter = window.innerHeight * 0.5;

      let closestId = strengthIds[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      strengthIds.forEach((id) => {
        const el = itemRefs.current[id];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height * 0.5;
        const distance = Math.abs(viewportCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      });

      setActiveId(closestId);
    };

    updateActiveItem();

    window.addEventListener("scroll", updateActiveItem, { passive: true });
    window.addEventListener("resize", updateActiveItem);

    return () => {
      window.removeEventListener("scroll", updateActiveItem);
      window.removeEventListener("resize", updateActiveItem);
    };
  }, [strengthIds]);

  return (
    <section className="relative bg-black py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm text-white/50 tracking-widest uppercase mb-4 block">
            Strengths
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
            How I Work
          </h2>
        </div>

        <ul className="w-full border-y border-white/10">
          {strengths.map((strength, index) => {
            const isActive = activeId === strength.id;

            return (
              <li
                key={strength.id}
                ref={(el) => {
                  itemRefs.current[strength.id] = el;
                }}
                className={
                  index !== strengths.length - 1
                    ? "border-b border-white/10"
                    : ""
                }
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20 py-14 md:py-16">
                  <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
                    <div className="relative w-[148px] h-[148px] md:w-[190px] md:h-[190px] lg:w-[228px] lg:h-[228px]">
                      <StrengthVisual strength={strength} isActive={isActive} />
                    </div>
                  </div>

                  <div className="flex-1 max-w-4xl transition-all duration-700">
                    <h3 className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mb-7">
                      <span
                        className={cn(
                          "text-[34px] md:text-[46px] lg:text-[54px] font-semibold tracking-[0.03em] leading-none transition-all duration-700",
                          isActive
                            ? "text-white opacity-100"
                            : "text-white/30 opacity-80"
                        )}
                      >
                        {strength.title}
                      </span>

                      <span
                        className={cn(
                          "inline-flex w-fit px-3.5 py-1.5 font-medium text-sm md:text-base rounded-full border transition-all duration-700",
                          isActive
                            ? "text-white/90 !border-white/70 bg-white/[0.03]"
                            : "text-white/35 border-white/15"
                        )}
                      >
                        {strength.subtitle}
                      </span>
                    </h3>

                    <p
                      className={cn(
                        "max-w-3xl text-base md:text-lg lg:text-xl leading-[1.9] break-keep transition-all duration-700",
                        isActive
                          ? "text-white/88 translate-y-0 opacity-100"
                          : "text-white/28 translate-y-1 opacity-70"
                      )}
                    >
                      {strength.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}