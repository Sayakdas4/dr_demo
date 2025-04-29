'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const LinesLeadGraph = () => {
     const salesOrderRef = useRef<HTMLCanvasElement>(null);
      const leadGenRef = useRef<HTMLCanvasElement>(null);
      let salesChart: Chart | null = null;
      let leadChart: Chart | null = null;
    
      useEffect(() => {
        if (salesOrderRef.current) {
          salesChart = new Chart(salesOrderRef.current, {
            type: 'line',
            data: {
              labels: ['Nov, 24', 'Jan, 25', 'Mar, 25'],
              datasets: [
                {
                  label: 'Sales Order',
                  data: [5, 48, 22],
                  borderColor: '#6366F1',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 5,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
    
        if (leadGenRef.current) {
          leadChart = new Chart(leadGenRef.current, {
            type: 'line',
            data: {
              labels: ['Nov, 24', 'Jan, 25', 'Mar, 25'],
              datasets: [
                {
                  label: 'Lead Generation',
                  data: [10, 160, 45],
                  borderColor: '#34D399',
                  backgroundColor: 'rgba(52, 211, 153, 0.1)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 5,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
    
        return () => {
          salesChart?.destroy();
          leadChart?.destroy();
        };
      }, []);
    
      return (
     <>
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Lead Generation</h2>
            <canvas ref={leadGenRef} />
            </>
         
      );
}

export default LinesLeadGraph;