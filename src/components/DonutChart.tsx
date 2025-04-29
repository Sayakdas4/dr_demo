'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie', // Still use "pie" type
      data: {
        labels: ['Apples', 'Bananas', 'Cherries'],
        datasets: [
          {
            label: 'Fruits',
            data: [120, 90, 60],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%', // 👈 This makes it a donut chart
        plugins: {
          legend: {
            position: 'bottom',
            display: false,
          },
        },
      },
    });
  }, []);

  return (
    <div className="mt-3" style={{ height: '280px', position: 'relative' }}>
      <canvas ref={chartRef} height={280} />
    </div>
  );
};

export default DonutChart;
