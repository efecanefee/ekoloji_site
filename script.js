// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-observer').forEach(el => {
    observer.observe(el);
});

// Chart.js Default Settings
Chart.defaults.color = '#a3b8ad';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(13, 22, 18, 0.9)';
Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
Chart.defaults.plugins.tooltip.bodyColor = '#e8f5e9';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(0, 230, 118, 0.3)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;

const greenPalette = ['#00e676', '#34e89e', '#69f0ae', '#b9f6ca', '#e8f5e9', '#00b25c', '#007a41'];

// ============================================
// Grafik 1: Küresel Ekolojik Ayak İzi (Pie)
// ============================================
const ctxPie1 = document.getElementById('chart-pie-1').getContext('2d');
new Chart(ctxPie1, {
    type: 'pie',
    plugins: [ChartDataLabels],
    data: {
        labels: ['Karbon', 'Tarım', 'Orman', 'Otlak', 'Balıkçılık', 'Yapılı Alan'],
        datasets: [{
            data: [60, 11, 9, 7, 7, 6],
            backgroundColor: ['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd', '#ff9ff3'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { color: '#e8f5e9' } },
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: (value, ctx) => {
                    return '%' + value;
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return ' ' + context.label + ': %' + context.raw;
                    }
                }
            }
        }
    }
});

// ============================================
// Grafik 2: Yaşam Döngüsü CO2 (Floating Bar / Range)
// ============================================
const ctxBar2 = document.getElementById('chart-bar-2').getContext('2d');
new Chart(ctxBar2, {
    type: 'bar',
    data: {
        labels: ['Kömür', 'Doğalgaz', 'Biyokütle', 'Güneş (PV)', 'Hidroelektrik', 'Nükleer', 'Rüzgar (Kara)'],
        datasets: [{
            label: 'CO₂ Emisyon Aralığı (g/kWh)',
            data: [
                [740, 910],  // Kömür
                [410, 650],  // Doğalgaz
                [130, 420],  // Biyokütle
                [28, 100],   // Güneş
                [4, 306],    // Hidro
                [3, 110],    // Nükleer
                [7, 38]      // Rüzgar
            ],
            backgroundColor: ['#ff5252', '#ffab40', '#00e676', '#69f0ae', '#00acc1', '#3498db', '#4db6ac'],
            borderRadius: 6,
            borderSkipped: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const min = context.raw[0];
                        const max = context.raw[1];
                        return ` ${min} - ${max} g CO₂/kWh`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                title: { display: true, text: 'g CO₂/kWh', color: '#a3b8ad' }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});

// ============================================
// Grafik 3: Türkiye 2025 Kurulu Güç (Doughnut)
// ============================================
const ctxDoughnut3 = document.getElementById('chart-doughnut-3').getContext('2d');
new Chart(ctxDoughnut3, {
    type: 'doughnut',
    plugins: [ChartDataLabels],
    data: {
        labels: ['Hidrolik', 'Güneş', 'Doğalgaz', 'Kömür', 'Rüzgar', 'Jeotermal', 'Diğer'],
        datasets: [{
            data: [26.6, 20.2, 19.8, 18.1, 11.8, 1.4, 2.1],
            backgroundColor: ['#1dd1a1', '#feca57', '#ff9f43', '#ff6b6b', '#48dbfb', '#ff9ff3', '#c8d6e5'],
            borderWidth: 0,
            hoverOffset: 10,
            cutout: '65%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { color: '#e8f5e9' } },
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 13
                },
                formatter: (value, ctx) => {
                    if(value < 3) return ''; // Hide small labels to prevent overlap
                    return '%' + value;
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return ' ' + context.label + ': %' + context.raw;
                    }
                }
            }
        }
    }
});

// ============================================
// Grafik 4: Türkiye Rüzgar & Güneş Büyüme (Line)
// ============================================
const ctxLine4 = document.getElementById('chart-line-4').getContext('2d');
new Chart(ctxLine4, {
    type: 'line',
    data: {
        labels: ['2020', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Rüzgar + Güneş Payı (%)',
            data: [9, 14, 18, 18, 22],
            borderColor: '#00e676',
            backgroundColor: 'rgba(0, 230, 118, 0.2)',
            borderWidth: 3,
            fill: true,
            tension: 0.4, // smooth curves
            pointBackgroundColor: '#fff',
            pointRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 30,
                grid: { color: 'rgba(255,255,255,0.05)' },
                title: { display: true, text: 'Yüzde (%)', color: '#a3b8ad' }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});

// ============================================
// Grafik 5: Gizli Etki: Arazi Kullanımı (Bar)
// ============================================
// Düzeltilmiş grafik: Daha anlaşılır olması için dikey ve sıraya dizilmiş.
// Aynı zamanda sayısal değerleri net bir şekilde üzerinde yazıyoruz.
const ctxHBar5 = document.getElementById('chart-hbar-5').getContext('2d');
new Chart(ctxHBar5, {
    type: 'bar',
    plugins: [ChartDataLabels],
    data: {
        labels: ['Rüzgar (Arazi)*', 'Kömür Madeni', 'Hidroelektrik', 'Güneş (Zemin)', 'Doğalgaz'],
        datasets: [{
            label: 'Arazi Kullanımı (m²/MWh)',
            data: [72, 23, 14, 12, 0.5],
            backgroundColor: ['#48dbfb', '#ff6b6b', '#1dd1a1', '#feca57', '#ff9f43'],
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { display: false },
            datalabels: {
                color: '#fff',
                anchor: 'end',
                align: 'top',
                font: {
                    weight: 'bold',
                    size: 13
                },
                formatter: (value) => {
                    return value + ' m²';
                }
            },
            tooltip: {
                callbacks: {
                    title: function() { return ''; },
                    label: function(context) {
                        return ' ' + context.label + ': ' + context.raw + ' m²/MWh';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 80,
                grid: { color: 'rgba(255,255,255,0.05)' },
                title: { display: true, text: 'm² Arazi / MWh', color: '#a3b8ad' }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});
