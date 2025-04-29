import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Reusable Pie Chart Component
const PieChartWrapper = ({ labels, data, backgroundColor, title }: {
    labels: string[];
    data: number[];
    backgroundColor: string[];
    title: string;
}) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [
                    {
                        label: title,
                        data,
                        backgroundColor,
                        hoverOffset: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}`;
                            },
                        },
                    },
                },
            },
        });
    }, [labels, data, backgroundColor, title]);

    return (
        <>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">{title}</h4>
            <div style={{ width: '100%', height: '280px', position: 'relative' }}>
                <canvas ref={chartRef} height={280} />
            </div>
        </>
    );
};

// Export individual chart components
export const PieChartOne = () => (
    <PieChartWrapper
        title="Invoice Value Payment Status"
        labels={['Payments Due', 'Upcoming Payments']}
        data={[10767, 1000]}
        backgroundColor={['#62c2ef', '#7dbf94']}
    />
);

export const PieChartTwo = () => (
    <PieChartWrapper
        title="Leads By Source"
        labels={['Source A', 'Source B', 'Source C', 'Source D', 'Source E']}
        data={[20, 15, 30, 10, 25]}
        backgroundColor={['#f7d448', '#f3c9bc', '#de5e52', '#90cee4', '#d2dc51']}
    />
);

export const PieChartThree = () => (
    <PieChartWrapper
        title="Lead Lost Reasons"
        labels={['Invalid Contact Number', 'No Interest', 'Budget Issue', 'Others']}
        data={[2, 4, 3, 1]}
        backgroundColor={['#f5ec52', '#eca340', '#df71a5', '#62c2ef']}
    />
);

