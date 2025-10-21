document.addEventListener('DOMContentLoaded', () => {

    localStorage.clear();
    localStorage.setItem('version', '2.0');

    const initialTrainingData = [
        { module: 'Cadastros Usuários e RH', description: 'Cadastro de Usuários (Incluindo perfis/permissões) e Cadastro de Funcionários/RH (Fluxos do Módulo RH).', status: 'pending' },
        { module: 'Cadastros Rotas e Clientes', description: 'Cadastro de Rotas/ Regiões e Cadastro de Cliente (Detalhado).', status: 'pending' },
        { module: 'Cadastros de Itens e Imobilizado', description: 'Cadastro de Produtos, Resíduos, Serviços e Imobilizados (Configuração inicial).', status: 'pending' },
        { module: 'Reunião Contabilidade / Fiscais', description: 'Reunião Contabilidade / Integrações Fiscais (Validação de parâmetros fiscais).', status: 'pending' },
        { module: 'Emissão Fiscal I - MTR On Line', description: 'MTR On Line (Emissão e gerenciamento de MTR On Line).', status: 'pending' },
        { module: 'Contratos e Tributação (Base)', description: 'Ponto de Coleta, Configuração de Tributação e regras básicas do Módulo Contrato.', status: 'pending' },
        { module: 'Contratos I (Criação)', description: 'Módulo Contratos I (Criação, aditivos, regras iniciais).', status: 'pending' },
        { module: 'Revisão Fiscal II - CME + Impostos', description: 'CME + Impostos (Configuração de Custos Médios de Entrada e revisão de Impostos).', status: 'pending' },
        { module: 'Contratos II (Gestão)', description: 'Módulo Contratos II (Gerenciamento, renovação).', status: 'pending' },
        { module: 'Agrupamento e Financeiro I', description: 'Agrupamento de Contratos e Módulo Financeiro (Configurações iniciais).', status: 'pending' },
        { module: 'Cadastros Base III - Fornecedores', description: 'Cadastro de Fornecedores e Módulo Compras.', status: 'pending' },
        { module: 'Configurações de E-mails', description: 'Configuração de caixas postais e templates de e-mail.', status: 'pending' },
        { module: 'Frota e Mobile I (Cadastros)', description: 'Cadastro de Veículos / Disp. Móveis, Usuários do App e Vinculação de Placa + Motorista.', status: 'pending' },
        { module: 'Comercial I (CRM)', description: 'Cadastro de Prospect e Módulo CRM Comercial.', status: 'pending' },
        { module: 'ParametrizaÇÃO Fiscal II', description: 'Parametrização MTR, CDF, CT-e.', status: 'pending' },
        { module: 'Comercial II (Propostas)', description: 'Proposta de Venda / Requisição de Venda (Fluxo completo).', status: 'pending' },
        { module: 'Administrativo II - Mala Direta', description: 'Configuração e uso do módulo Mala Direta.', status: 'pending' },
        { module: 'Gestão de OS (Logística)', description: 'Logística e gerenciamento de Ordem de Serviço (O.S.).', status: 'pending' },
        { module: 'Roteirização Avançada', description: 'Parametrização Roteirização Google Maps e Fluxo de Roteirização.', status: 'pending' },
        { module: 'Mobile II (App)', description: 'Treinamento no uso prático do Aplicativo VS Resíduos.', status: 'pending' },
        { module: 'Frota e Manutenção', description: 'Módulo Frota e manutenção de veículos.', status: 'pending' },
        { module: 'Custos Avançados', description: 'Desdobramento de Custos e detalhamento do Plano de Contas.', status: 'pending' },
        { module: 'Comunicação Externa', description: 'Configuração da integração WhatsApp e Treinamento de uso.', status: 'pending' },
        { module: 'Controle de Imobilizados', description: 'Gestão e Controle do módulo de Imobilizados (Avançado).', status: 'pending' },
        { module: 'Módulo Financeiro', description: 'Contas a pagar/receber, conciliação e fluxo financeiro geral.', status: 'pending' },
        { module: 'Clientes e Painéis', description: 'Uso e configuração da Área do Cliente e Painel Gerencial.', status: 'pending' },
        { module: 'Revisão Fiscal III - Notas Diversas', description: 'Emissão e gestão de Notas Diversas.', status: 'pending' },
        { module: 'Destinação Final', description: 'Fluxo de Destinação Final de resíduos.', status: 'pending' },
        { module: 'Emissão Fiscal III (Completa)', description: 'Emissão e conferência de CT-e e MDF-e, CDF e geração de laudos.', status: 'pending' },
        { module: 'Configuração NF', description: 'Parametrização das NFS-e / NFE (Configurações municipais e estaduais).', status: 'pending' },
        { module: 'Módulo Industrial', description: 'Treinamento no Módulo Indústria (Processo fabril).', status: 'pending' },
        { module: 'Integração Bancária', description: 'Homologação bancária e Integração bancaria Remessa/Retorno.', status: 'pending' },
        { module: 'Faturamento I (OS + BM)', description: 'Faturamento de Ordem de Serviço (OS) + Boletos e Medição (BM).', status: 'pending' },
        { module: 'Faturamento II (NF + Boleto)', description: 'Faturamento: Emissão Nfse /NF-e + boleto (Fluxo completo).', status: 'pending' },
        { module: 'Relatórios e Fechamentos', description: 'Reunião de Validação de Relatórios e Fechamentos.', status: 'pending' },
        { module: 'Reunião Inicial', description: 'Reunião Inicial de Fluxo Operacional (Alinhamento de expectativa).', status: 'pending' },
        { module: 'Transição para Suporte', description: 'Reunião de transição para o setor de Suporte.', status: 'pending' },
        { module: 'Pontos Importantes', description: 'Pontuar todos fatos importantes do projeto e próximos passos.', status: 'pending' },
    ];

    let trainingData = [...initialTrainingData];
    let removedSessions = [];
    let selectedDays = [];
    let chartInstance = null;

    const timelineContainer = document.getElementById('timeline-container');
    const generateScheduleBtn = document.getElementById('generate-schedule-btn');
    const startDateInput = document.getElementById('start-date');
    const startTimeInput = document.getElementById('start-time');
    const selectionAlert = document.getElementById('selection-alert');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const loadingMessage = document.getElementById('loading-message');
    const pdfContent = document.getElementById('pdf-content');


    function initializeConfigControls() {
        const daySelector = document.getElementById('day-selector');

        selectedDays = JSON.parse(localStorage.getItem('selectedDays')) || [];

        daySelector.querySelectorAll('.day-toggle').forEach(button => {
            const day = parseInt(button.dataset.day);

            if (selectedDays.includes(day)) {
                button.classList.add('selected');
            }

            button.addEventListener('click', () => {
                button.classList.toggle('selected');

                selectedDays = Array.from(daySelector.querySelectorAll('.day-toggle.selected'))
                    .map(btn => parseInt(btn.dataset.day));

                localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
                renderTimeline();
            });
        });

        startTimeInput.value = localStorage.getItem('startTime') || "";
        startTimeInput.addEventListener('change', () => {
            localStorage.setItem('startTime', startTimeInput.value);
        });

        startDateInput.value = localStorage.getItem('startDate') || "";
        startDateInput.addEventListener('change', () => {
            localStorage.setItem('startDate', startDateInput.value);
        });
    }

    initializeConfigControls(); 

    function calculateScheduleDates(data, daysToUse, timeToUse, dateStart) {
        if (daysToUse.length === 0 || !dateStart) {
            document.getElementById('summary-start-date').textContent = '-';
            document.getElementById('date-final').textContent = '-';
            document.getElementById('summary-duration').textContent = '-';
            return;
        }

        const [hour, minute] = timeToUse.split(':').map(Number);
        const [startYear, startMonth, startDay] = dateStart.split('-').map(Number);
        let currentDate = new Date(startYear, startMonth - 1, startDay, hour, minute);

        while (!daysToUse.includes(currentDate.getDay())) {
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const actualFirstDate = new Date(currentDate);
        
        const startFormatted = `${String(actualFirstDate.getDate()).padStart(2, '0')}/${String(actualFirstDate.getMonth() + 1).padStart(2, '0')}/${actualFirstDate.getFullYear()}`;
        document.getElementById('summary-start-date').textContent = startFormatted;

        let lastSessionDate;

        data.forEach(session => {
            session.date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            session.day = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'][currentDate.getDay()];
            session.month = `${currentDate.toLocaleString('default', { month: 'long' })} - ${currentDate.getFullYear()}`;

            session.fullDate = `${session.date}/${currentDate.getFullYear()}`;

            lastSessionDate = new Date(currentDate); 

            let nextDate = new Date(currentDate);
            do {
                nextDate.setDate(nextDate.getDate() + 1);
            } while (!daysToUse.includes(nextDate.getDay()));

            currentDate = nextDate;
        });

        if (data.length > 0 && lastSessionDate) {
            const finalFormatted = `${String(lastSessionDate.getDate()).padStart(2, '0')}/${String(lastSessionDate.getMonth() + 1).padStart(2, '0')}/${lastSessionDate.getFullYear()}`;
            document.getElementById('date-final').textContent = finalFormatted;

            let startMonthIndex = actualFirstDate.getFullYear() * 12 + actualFirstDate.getMonth();
            let endMonthIndex = lastSessionDate.getFullYear() * 12 + lastSessionDate.getMonth();
            
            let inclusiveMonthSpan = (endMonthIndex - startMonthIndex) + 1;

            document.getElementById('summary-duration').textContent = `~${inclusiveMonthSpan} ${inclusiveMonthSpan > 1 ? 'Meses' : 'Mês'}`;
        
        } else {
            document.getElementById('date-final').textContent = '-';
            document.getElementById('summary-duration').textContent = '-';
        }
    }

    function renderTimeline() {
        const totalSessionsEl = document.getElementById('summary-total-sessions');

        if (selectedDays.length === 0 || !startDateInput.value) {
            selectionAlert.style.display = 'block';
            timelineContainer.innerHTML = '';
            
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
            
            if(totalSessionsEl) totalSessionsEl.textContent = '0'; 
            return;
        }

        selectionAlert.style.display = 'none';
        timelineContainer.innerHTML = '';

        let dataToRender = trainingData.filter((_, i) => !removedSessions.includes(i));
        
        if(totalSessionsEl) totalSessionsEl.textContent = dataToRender.length;

        calculateScheduleDates(dataToRender, selectedDays, startTimeInput.value, startDateInput.value);

        renderSessionsChart(dataToRender);

        const months = [...new Set(dataToRender.map(item => item.month))];
        months.forEach(month => {
            const monthSection = document.createElement('div');
            monthSection.id = month.replace(/\\s/g, '-').replace('/', '-');
            monthSection.className = 'month-section';

            const monthHeader = document.createElement('h3');
            monthHeader.className = 'text-xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4';
            monthHeader.textContent = month;
            monthSection.appendChild(monthHeader);

            const sessionsGrid = document.createElement('div');
            sessionsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';

            const sessionsForMonth = dataToRender.filter(session => session.month === month);
            sessionsForMonth.forEach(session => {
                const globalIndex = trainingData.indexOf(session);
                const isCompleted = session.status === 'completed';

                const sessionCard = document.createElement('div');
                sessionCard.className = `session-card relative p-4 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg ${isCompleted ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-100 border-l-4 border-blue-500'}`;
                sessionCard.dataset.index = globalIndex;

                sessionCard.innerHTML = `
                    <button class=\"absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg remove-session-btn\">×</button>
                    <p class=\"font-bold text-sm ${isCompleted ? 'text-green-800' : 'text-blue-800'}\">${session.date} - ${session.day}</p>
                    
                    <p class=\"font-semibold ${isCompleted ? 'text-gray-700' : 'text-gray-800'} editable-field\" 
                       data-key=\"module\" 
                       title=\"Dê dois cliques para editar\">
                       ${session.module}
                    </p>
                    <div class=\"text-sm text-gray-600 mt-2 editable-field\" 
                         data-key=\"description\" 
                         title=\"Dê dois cliques para editar\">
                         ${session.description}
                    </div>
                `;

                sessionsGrid.appendChild(sessionCard);
            });

            monthSection.appendChild(sessionsGrid);
            timelineContainer.appendChild(monthSection);
        });
    }

    function renderSessionsChart(data) {
    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = document.getElementById('sessionsByMonthChart').getContext('2d');

    const sessionsByMonth = data.reduce((acc, session) => {
        const month = session.month; 
        if (month) { 
            acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
    }, {});

    const labels = Object.keys(sessionsByMonth);
    const dataCounts = Object.values(sessionsByMonth);

    chartInstance = new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Sessões por Mês',
                data: dataCounts,
                backgroundColor: 'rgba(20, 184, 166, 0.6)', 
                borderColor: 'rgba(15, 118, 110, 1)', 
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false 
                },
                title: {
                    display: true,
                    text: 'Distribuição de Sessões ao Longo dos Meses',
                    font: {
                        size: 16
                    },
                    color: '#374151'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}
    timelineContainer.addEventListener('click', e => {
        if (e.target.classList.contains('remove-session-btn')) {
            const index = parseInt(e.target.closest('.session-card').dataset.index);

            const deleteAction = () => {
                removedSessions.push(index);
                renderTimeline();
            };

            showConfirmationPopup(
                'Confirmar Exclusão', 
                'Deseja realmente remover este treinamento da geração atual?', 
                deleteAction
            );
        }
    });

    timelineContainer.addEventListener('dblclick', e => {
        if (e.target.classList.contains('editable-field')) {
            const element = e.target;
            element.contentEditable = true;
            element.focus();
            
            document.execCommand('selectAll', false, null);
        }
    });

    timelineContainer.addEventListener('blur', e => {
        if (e.target.classList.contains('editable-field')) {
            const element = e.target;
            
            element.contentEditable = false;

            const newText = element.textContent; 
            const keyToUpdate = element.dataset.key;
            const index = parseInt(e.target.closest('.session-card').dataset.index); 

            if (trainingData[index] && trainingData[index][keyToUpdate] !== undefined) {
                trainingData[index][keyToUpdate] = newText;
            } else {
                console.error('Não foi possível salvar a edição: Índice ou chave de dados inválida.');
            }
        }
    }, true);

    timelineContainer.addEventListener('keydown', e => {
        if (e.target.classList.contains('editable-field') && e.target.isContentEditable) {
            
            if (e.key === 'Enter' && !e.shiftKey) {
                if (e.target.dataset.key === 'module') {
                    e.preventDefault(); 
                    e.target.blur(); 
                }

            }
            
            if (e.key === 'Escape') {
                e.target.blur();
            }
        }
    });
    
    downloadPdfBtn.addEventListener('click', async () => {
        loadingMessage.classList.remove('hidden');

        const summaryTextToHide = document.querySelector('#summary > p'); 
        const removeButtons = document.querySelectorAll('.remove-session-btn');

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();
            const margin = 10;
            const usableWidth = pdfWidth - (margin * 2);
            let currentY = margin;

            const processElement = async (element) => {
                if (!element) return null;
                return await html2canvas(element, { scale: 2, useCORS: true });
            };

            const getScaledHeight = (canvas) => (canvas.height * usableWidth) / canvas.width;

            if (summaryTextToHide) summaryTextToHide.style.visibility = 'hidden';
            removeButtons.forEach(btn => btn.style.visibility = 'hidden');

            const summaryEl = document.getElementById('summary');
            const summaryCanvas = await processElement(summaryEl);
            const summaryHeight = getScaledHeight(summaryCanvas);

            doc.addImage(summaryCanvas.toDataURL('image/png'), 'PNG', margin, currentY, usableWidth, summaryHeight);
            currentY += summaryHeight + 10; 

            const monthSections = document.querySelectorAll('.month-section');

            for (const monthSection of monthSections) {
                const titleEl = monthSection.querySelector('h3');
                const gridEl = monthSection.querySelector('.grid');
                if (!titleEl || !gridEl) continue;

                const titleCanvas = await processElement(titleEl);
                const gridCanvas = await processElement(gridEl);

                const titleHeight = getScaledHeight(titleCanvas) + 3;
                const gridHeight = getScaledHeight(gridCanvas);
                const totalMonthHeight = titleHeight + gridHeight;

                if (currentY + totalMonthHeight > pdfHeight - margin) {
                    doc.addPage();
                    currentY = margin;
                }

                doc.addImage(titleCanvas.toDataURL('image/png'), 'PNG', margin, currentY, usableWidth, getScaledHeight(titleCanvas));
                currentY += titleHeight; 

                doc.addImage(gridCanvas.toDataURL('image/png'), 'PNG', margin, currentY, usableWidth, gridHeight);
                currentY += gridHeight + 5;
            }

            doc.save('cronograma-implantacao.pdf');

        } catch (err) {
            console.error('Erro ao gerar PDF:', err);
            alert('Ocorreu um erro ao gerar o PDF.');
        } finally {
            
            if (summaryTextToHide) summaryTextToHide.style.visibility = 'visible';
            removeButtons.forEach(btn => btn.style.visibility = 'visible');
            loadingMessage.classList.add('hidden');
        }
    });

    const downloadCsvBtn = document.getElementById('download-csv-btn');

    downloadCsvBtn.addEventListener('click', () => {
        if (selectedDays.length === 0 || !startDateInput.value) {
            alert('Por favor, gere um cronograma antes de exportar para Excel.');
            return;
        }

        let dataToExport = trainingData.filter((_, i) => !removedSessions.includes(i));
        
        calculateScheduleDates(dataToExport, selectedDays, startTimeInput.value, startDateInput.value);

        const headers = ['Data Completa', 'Dia da Semana', 'Mês Referência', 'Módulo', 'Descrição'];
        let csvContent = headers.join(';') + '\n';

        const sanitize = (str) => {
            if (str === null || str === undefined) str = '';
            let s = str.toString();
            if (s.includes(';') || s.includes('\n') || s.includes('"')) {
                s = s.replace(/"/g, '""'); 
                s = `"${s}"`; 
            }
            return s;
        };

        dataToExport.forEach(session => {
            const row = [
                session.fullDate, 
                session.day,
                session.month,
                session.module,
                session.description
            ];
            csvContent += row.map(sanitize).join(';') + '\n';
        });


        const bom = '\uFEFF';
        const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
        
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'cronograma.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    function showPopup() {
        const popup = document.getElementById('popup-cronograma');
        const closeBtn = document.getElementById('close-popup-btn');
        if (!popup || !closeBtn) return;

        popup.classList.remove('hidden');

        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        
        newCloseBtn.addEventListener('click', () => {
            popup.classList.add('hidden');
        });

        setTimeout(() => {
            popup.classList.add('hidden');
        }, 3000);
    }
    
    function showConfirmationPopup(title, message, onConfirmCallback) {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
        popup.id = 'confirmation-popup';
        
        popup.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full border-t-4 border-red-500 animate-popup">
                <div class="flex justify-center mb-3">
                    <svg class="h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">${title}</h2>
                <p class="text-gray-600 text-center mb-6">${message}</p>
                
                <div class="flex justify-center gap-4">
                    <button id="confirm-cancel-btn" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button id="confirm-action-btn" class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Confirmar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        const cancelButton = document.getElementById('confirm-cancel-btn');
        const confirmButton = document.getElementById('confirm-action-btn');

        cancelButton.addEventListener('click', () => {
            popup.remove();
        });

        confirmButton.addEventListener('click', () => {
            onConfirmCallback();
            popup.remove();
        });
    }
    generateScheduleBtn.addEventListener('click', () => {
        removedSessions = [];
        renderTimeline();
        showPopup(); 
    });

});