"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 기존 포트폴리오 데이터 (Portfolio.tsx에서 가져옴)
const portfolioItems = [
  { id: 1, title: "Hero Calling Sperman", image: "https://ext.same-assets.com/334974529/1689742189.jpeg", category: "Short Drama" },
  { id: 2, title: "Dark City", image: "https://ext.same-assets.com/334974529/722674647.jpeg", category: "Film" },
  { id: 3, title: "Apocalypse", image: "https://ext.same-assets.com/334974529/4034187842.jpeg", category: "Film" },
  { id: 4, title: "Wolf Pack", image: "https://ext.same-assets.com/334974529/2840053023.jpeg", category: "Film" },
  { id: 5, title: "Ghost", image: "https://ext.same-assets.com/334974529/87431091.jpeg", category: "Short Drama" },
  { id: 6, title: "Hidden Eye", image: "https://ext.same-assets.com/334974529/3173942963.jpeg", category: "Drama" },
  { id: 7, title: "Truth or False", image: "https://ext.same-assets.com/334974529/3037917635.jpeg", category: "Drama" },
  { id: 8, title: "Health Center", image: "https://ext.same-assets.com/334974529/1531246526.jpeg", category: "Animation" },
  { id: 9, title: "Red Shadow", image: "https://ext.same-assets.com/334974529/2948016275.jpeg", category: "Film" },
];

export default function SpiralGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // 상태 및 애니메이션 변수
  const state = useRef({
    currentAngle: 200, // 초기 회전 각도
    velocity: 0,
    isDragging: false,
    lastMouseX: 0,
    isHovered: false,
    isIntersecting: false,
    rotationSpeed: 0.03,
  });

  useEffect(() => {
    if (!containerRef.current || !galleryRef.current) return;

    const container = containerRef.current;
    const gallery = galleryRef.current;
    const items = Array.from(gallery.children) as HTMLElement[];

    // 1. 반응형 설정
    const getLayoutConfig = () => {
      const isMobile = window.innerWidth <= 768;
      return {
        radius: isMobile ? 300 : 500,
        itemShift: isMobile ? 30 : 60,
        baseZ: -200,
        sliceCount: 12,
      };
    };

    // 2. 아이템 배치 함수
    const positionItems = () => {
      const config = getLayoutConfig();
      const angleUnit = 360 / config.sliceCount;

      items.forEach((item, i) => {
        const itemAngle = angleUnit * (i % config.sliceCount);
        const itemAngleRad = (itemAngle * Math.PI) / 180;
        const x = Math.sin(itemAngleRad) * config.radius;
        const z = Math.cos(itemAngleRad) * config.radius;
        const y = i * config.itemShift;

        item.style.transform = `translateX(${x}px) translateZ(${z}px) translateY(${y}px)`;
        const card = item.querySelector(".card-inner") as HTMLElement;
        if (card) card.style.transform = `rotateY(${itemAngle}deg)`;
      });

      // 컨테이너 높이 조절
      const totalHeight = items.length * config.itemShift + 400;
      container.style.height = `${totalHeight}px`;
    };

    positionItems();

    // 3. 인터랙션 이벤트
    const handleMouseDown = (e: MouseEvent) => {
      state.current.isDragging = true;
      state.current.lastMouseX = e.clientX;
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!state.current.isDragging) return;
      const deltaX = e.clientX - state.current.lastMouseX;
      state.current.velocity = deltaX * 0.15;
      state.current.currentAngle += deltaX * 0.5;
      state.current.lastMouseX = e.clientX;
    };

    const handleMouseUp = () => {
      state.current.isDragging = false;
      container.style.cursor = "grab";
    };

    // 4. 애니메이션 루프
    let animId: number;
    const update = () => {
      const s = state.current;
      
      if (!s.isDragging) {
        const friction = s.isHovered ? 0.92 : 0.98;
        if (Math.abs(s.velocity) > 0.005) {
          s.currentAngle += s.velocity;
          s.velocity *= friction;
        } else if (s.isIntersecting && !s.isHovered) {
          s.currentAngle += s.rotationSpeed;
        }
      }

      gallery.style.transform = `translateZ(-400px) rotateY(${s.currentAngle}deg)`;
      animId = requestAnimationFrame(update);
    };

    // 5. 관찰자 (Intersection Observer)
    const observer = new IntersectionObserver(
      ([entry]) => {
        state.current.isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    // 이벤트 리스너 등록
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseenter", () => (state.current.isHovered = true));
    container.addEventListener("mouseleave", () => (state.current.isHovered = false));
    window.addEventListener("resize", positionItems);
    observer.observe(container);
    
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", positionItems);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative bg-black overflow-hidden py-32">
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10 pointer-events-none">
        <span className="text-sm tracking-widest text-white/50 uppercase mb-4 block">Portfolio</span>
        <h2 className="text-3xl md:text-5xl font-semibold text-white">Our Crafted Scenes</h2>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full cursor-grab active:cursor-grabbing"
        style={{ perspective: "1500px" }}
      >
        <div 
          ref={galleryRef}
          className="absolute top-0 left-1/2 w-0 h-0 transition-transform duration-100 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="absolute left-[-110px] top-0 w-[220px] md:w-[280px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="card-inner relative aspect-[3/4] rounded-xl overflow-hidden group border border-white/10">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[10px] text-white/50 uppercase tracking-tighter">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-medium text-white mt-1">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-20 relative z-10">
        <Link
          href="/works"
          className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full transition-all group text-white"
        >
          <span className="text-sm font-medium">View All Works</span>
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}