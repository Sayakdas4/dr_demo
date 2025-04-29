'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
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
      type: 'line', // 👈 Line chart here
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Monthly Sales',
            data: [150, 200, 180, 220, 240, 210],
            borderColor: '#1C3FAA',
            backgroundColor: 'rgba(28, 63, 170, 0.1)',
            fill: true,
            tension: 0.4, // smooth curves
            pointRadius: 4,
            pointBackgroundColor: '#1C3FAA',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, // set to false if you want to hide it
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: false,
            },
          },
          y: {
            display: true,
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div className="mt-3" style={{ height: '300px', position: 'relative' }}>
      <canvas ref={chartRef} height={300} />
    </div>
  );
};

export default LineChart;
