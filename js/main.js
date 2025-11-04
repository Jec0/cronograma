document.addEventListener('DOMContentLoaded', () => {

    localStorage.clear();
    localStorage.setItem('version', '2.2');

    const initialTrainingDataRaw = [
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

    let trainingData = initialTrainingDataRaw.map((s, i) => ({ ...s, id: `s${i}` }));

    let observationCards = [];

    let sequence = trainingData.map(s => ({ type: 'session', id: s.id }));

    let selectedDays = JSON.parse(localStorage.getItem('selectedDays')) || [];
    let chartInstance = null;

    const timelineContainer = document.getElementById('timeline-container');
    const generateScheduleBtn = document.getElementById('generate-schedule-btn');
    const startDateInput = document.getElementById('start-date');
    const startTimeInput = document.getElementById('start-time');
    const selectionAlert = document.getElementById('selection-alert') || document.getElementById('selection-alert'); // pode existir em versões
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const downloadCsvBtn = document.getElementById('download-csv-btn');
    const loadingMessage = document.getElementById('loading-message') || document.getElementById('loading-message');

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
                selectedDays = Array.from(daySelector.querySelectorAll('.day-toggle.selected')).map(btn => parseInt(btn.dataset.day));
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

    function calculateScheduleDatesForSessions(daysToUse, timeToUse, dateStart) {
        if (!dateStart || daysToUse.length === 0) {
            document.getElementById('summary-start-date') && (document.getElementById('summary-start-date').textContent = '-');
            document.getElementById('date-final') && (document.getElementById('date-final').textContent = '-');
            document.getElementById('summary-duration') && (document.getElementById('summary-duration').textContent = '-');
            return;
        }

        const [hour, minute] = (timeToUse || "00:00").split(':').map(Number);
        const [startYear, startMonth, startDay] = dateStart.split('-').map(Number);
        let currentDate = new Date(startYear, startMonth - 1, startDay, hour, minute);

        while (!daysToUse.includes(currentDate.getDay())) currentDate.setDate(currentDate.getDate() + 1);
        const actualFirstDate = new Date(currentDate);

        let lastSessionDate = null;
        trainingData.forEach(session => {
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

        if (trainingData.length > 0 && lastSessionDate) {
            const startFormatted = `${String(actualFirstDate.getDate()).padStart(2,'0')}/${String(actualFirstDate.getMonth()+1).padStart(2,'0')}/${actualFirstDate.getFullYear()}`;
            const finalFormatted = `${String(lastSessionDate.getDate()).padStart(2,'0')}/${String(lastSessionDate.getMonth()+1).padStart(2,'0')}/${lastSessionDate.getFullYear()}`;
            document.getElementById('summary-start-date') && (document.getElementById('summary-start-date').textContent = startFormatted);
            document.getElementById('date-final') && (document.getElementById('date-final').textContent = finalFormatted);

            let startMonthIndex = actualFirstDate.getFullYear() * 12 + actualFirstDate.getMonth();
            let endMonthIndex = lastSessionDate.getFullYear() * 12 + lastSessionDate.getMonth();
            let inclusiveMonthSpan = (endMonthIndex - startMonthIndex) + 1;
            document.getElementById('summary-duration') && (document.getElementById('summary-duration').textContent = `~${inclusiveMonthSpan} ${inclusiveMonthSpan > 1 ? 'Meses' : 'Mês'}`);
        } else {
            document.getElementById('summary-start-date') && (document.getElementById('summary-start-date').textContent = '-');
            document.getElementById('date-final') && (document.getElementById('date-final').textContent = '-');
            document.getElementById('summary-duration') && (document.getElementById('summary-duration').textContent = '-');
        }
    }

    function renderTimeline() {
        if (selectedDays.length === 0 || !startDateInput.value) {
            selectionAlert && (selectionAlert.style.display = 'block');
            timelineContainer.innerHTML = '';
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
            document.getElementById('summary-total-sessions') && (document.getElementById('summary-total-sessions').textContent = '0');
            return;
        } else {
            selectionAlert && (selectionAlert.style.display = 'none');
        }

        calculateScheduleDatesForSessions(selectedDays, startTimeInput.value, startDateInput.value);

        const monthsOrdered = [...new Set(trainingData.map(s => s.month))];

        timelineContainer.innerHTML = '';

        document.getElementById('summary-total-sessions') && (document.getElementById('summary-total-sessions').textContent = String(trainingData.length));

        renderSessionsChart(trainingData);

        const sessionsById = {};
        trainingData.forEach(s => sessionsById[s.id] = s);
        const obsById = {};
        observationCards.forEach(o => obsById[o.id] = o);

        if (monthsOrdered.length === 0) {
            const emptySection = document.createElement('div');
            emptySection.className = 'month-section';
            const header = document.createElement('h3');
            header.className = 'text-xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4';
            header.textContent = 'Sem Sessões';
            emptySection.appendChild(header);

            const grid = document.createElement('div');
            grid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 session-grid-container';
            emptySection.appendChild(grid);
            timelineContainer.appendChild(emptySection);

            sequence.forEach(item => {
                if (item.type === 'observation') {
                    const obs = obsById[item.id];
                    if (obs) grid.appendChild(buildCardElement(obs, true, item.id));
                }
            });

            initializeDragAndDrop(); 
            return;
        }

        monthsOrdered.forEach(month => {
            const monthSection = document.createElement('div');
            monthSection.id = month.replace(/\s/g, '-').replace('/', '-');
            monthSection.className = 'month-section';

            const monthHeader = document.createElement('h3');
            monthHeader.className = 'text-xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4';
            monthHeader.textContent = month;
            monthSection.appendChild(monthHeader);

            const sessionsGrid = document.createElement('div');
            sessionsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 session-grid-container';
            monthSection.appendChild(sessionsGrid);

            timelineContainer.appendChild(monthSection);
        });

        let currentMonthIndex = 0;
        let firstMonth = monthsOrdered[0];

        sequence.forEach(item => {
            if (item.type === 'session') {
                const s = sessionsById[item.id];
                if (!s) return;
                const month = s.month || firstMonth;
                const targetSection = timelineContainer.querySelector(`#${month.replace(/\s/g,'-').replace('/','-')} .session-grid-container`);
                if (targetSection) {
                    targetSection.appendChild(buildCardElement(s, false, item.id));
                } else {
                    const fallback = timelineContainer.querySelector('.session-grid-container');
                    fallback && fallback.appendChild(buildCardElement(s, false, item.id));
                }
            } else if (item.type === 'observation') {
                const o = obsById[item.id];
                if (!o) return;
                let placed = false;
                const seqIndex = sequence.findIndex(x => x.type === item.type && x.id === item.id);
                let chosenGrid = null;
                for (let k = seqIndex + 1; k < sequence.length; k++) {
                    if (sequence[k].type === 'session') {
                        const nextSess = sessionsById[sequence[k].id];
                        if (nextSess) {
                            chosenGrid = timelineContainer.querySelector(`#${nextSess.month.replace(/\s/g,'-').replace('/','-')} .session-grid-container`);
                            break;
                        }
                    }
                }
                if (!chosenGrid) {
                    for (let k = seqIndex - 1; k >= 0; k--) {
                        if (sequence[k].type === 'session') {
                            const prevSess = sessionsById[sequence[k].id];
                            if (prevSess) {
                                chosenGrid = timelineContainer.querySelector(`#${prevSess.month.replace(/\s/g,'-').replace('/','-')} .session-grid-container`);
                                break;
                            }
                        }
                    }
                }
                if (!chosenGrid) chosenGrid = timelineContainer.querySelector('.session-grid-container');

                if (chosenGrid) {
                    chosenGrid.appendChild(buildCardElement(o, true, item.id));
                }
            }
        });

        initializeDragAndDrop();
    }

    function buildCardElement(obj, isObservation, itemId) {
        const isCompleted = obj.status === 'completed';
        const card = document.createElement('div');
        card.className = `session-card relative p-4 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg ${isCompleted ? 'bg-green-100 border-l-4 border-green-500' : (isObservation ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-gray-100 border-l-4 border-[#37502b]')}`;
        card.dataset.itemType = isObservation ? 'observation' : 'session';
        card.dataset.itemId = itemId;
        card.innerHTML = `
            <button class="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg remove-session-btn">×</button>
            ${!isObservation ? `<p class="font-bold text-sm ${isCompleted ? 'text-green-800' : 'text-[#37502b]'}">${obj.date || '--/--'} - ${obj.day || ''}</p>` : ''}
            <p class="font-semibold ${isCompleted ? 'text-gray-700' : 'text-gray-800'} editable-field" data-key="module" title="Dê dois cliques para editar">${obj.module}</p>
            <div class="text-sm text-gray-600 mt-2 editable-field" data-key="description" title="Dê dois cliques para editar">${obj.description}</div>
        `;
        return card;
    }

    function initializeDragAndDrop() {
        if (window.sortableInstances && window.sortableInstances.length) {
            window.sortableInstances.forEach(inst => inst.destroy());
        }
        window.sortableInstances = [];

        const grids = document.querySelectorAll('.session-grid-container');
        grids.forEach(grid => {
            const sortable = new Sortable(grid, {
                group: 'shared-sessions',
                animation: 150,
                draggable: '.session-card',
                onAdd: rebuildSequenceFromDOM,
                onUpdate: rebuildSequenceFromDOM,
                onEnd: rebuildSequenceFromDOM
            });
            window.sortableInstances.push(sortable);
        });
    }

    function rebuildSequenceFromDOM() {
        const allCardEls = Array.from(document.querySelectorAll('.session-card'));
        const newSeq = [];
        allCardEls.forEach(cardEl => {
            const type = cardEl.dataset.itemType;
            const id = cardEl.dataset.itemId;
            if (type && id) newSeq.push({ type, id });
        });

        const sessionsMap = {};
        trainingData.forEach(s => sessionsMap[s.id] = s);
        const obsMap = {};
        observationCards.forEach(o => obsMap[o.id] = o);

        const newTrainingData = [];
        const newObservationCards = [];
        newSeq.forEach(item => {
            if (item.type === 'session' && sessionsMap[item.id]) {
                newTrainingData.push(sessionsMap[item.id]);
            } else if (item.type === 'observation' && obsMap[item.id]) {
                newObservationCards.push(obsMap[item.id]);
            }
        });

        trainingData.forEach(s => {
            if (!newTrainingData.find(x => x.id === s.id)) newTrainingData.push(s);
        });
        observationCards.forEach(o => {
            if (!newObservationCards.find(x => x.id === o.id)) newObservationCards.push(o);
        });

        trainingData = newTrainingData;
        observationCards = newObservationCards;

        sequence = [];
        newSeq.forEach(item => {
            if (item.type === 'session' && sessionsMap[item.id]) sequence.push(item);
            if (item.type === 'observation' && obsMap[item.id]) sequence.push(item);
        });

        if (sequence.length === 0) {
            sequence = trainingData.map(s => ({ type: 'session', id: s.id }));
            observationCards.forEach(o => sequence.push({ type: 'observation', id: o.id }));
        }

        renderTimeline();
    }

    function addSession() {
        const newId = 's' + Date.now();
        const newSession = {
            id: newId,
            module: 'Nova Sessão',
            description: 'Descrição da Sessão',
            status: 'pending'
        };
        trainingData.push(newSession);
        sequence.push({ type: 'session', id: newId });
        renderTimeline();
    }

    function addObservation() {
        const newId = 'o' + Date.now() + Math.floor(Math.random() * 1000);
        const newObs = {
            id: newId,
            module: 'Observação',
            description: 'Digite aqui sua observação...',
            status: 'note'
        };
        observationCards.push(newObs);
        sequence.push({ type: 'observation', id: newId });
        renderTimeline();
    }

timelineContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('remove-session-btn')) return;

    const cardEl = e.target.closest('.session-card');
    if (!cardEl) return;
    const type = cardEl.dataset.itemType;
    const id = cardEl.dataset.itemId;
    if (!id) return;

    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    popup.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6 text-center w-80 border-t-4 border-red-500 animate-popup">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Remover item?</h2>
            <p class="text-gray-600 mb-5">Tem certeza de que deseja excluir este ${type === 'session' ? 'treinamento' : 'card de observação'}?</p>
            <div class="flex justify-center gap-4">
                <button id="confirm-remove" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Sim
                </button>
                <button id="cancel-remove" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                    Cancelar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector('#cancel-remove').addEventListener('click', () => {
        popup.remove();
    });

    popup.querySelector('#confirm-remove').addEventListener('click', () => {
        popup.remove();

        if (type === 'session') {
            trainingData = trainingData.filter(s => s.id !== id);
            sequence = sequence.filter(x => !(x.type === 'session' && x.id === id));
        } else {
            observationCards = observationCards.filter(o => o.id !== id);
            sequence = sequence.filter(x => !(x.type === 'observation' && x.id === id));
        }

        renderTimeline();
    });
});


    timelineContainer.addEventListener('dblclick', e => {
        if (e.target.classList.contains('editable-field')) {
            e.target.contentEditable = true;
            e.target.focus();
            document.execCommand('selectAll', false, null);
        }
    });

    timelineContainer.addEventListener('blur', e => {
        if (e.target.classList.contains('editable-field')) {
            const field = e.target;
            field.contentEditable = false;
            const key = field.dataset.key;
            const cardEl = field.closest('.session-card');
            if (!cardEl) return;
            const type = cardEl.dataset.itemType;
            const id = cardEl.dataset.itemId;
            if (!id) return;

            if (type === 'session') {
                const s = trainingData.find(x => x.id === id);
                if (s) s[key] = field.textContent;
            } else {
                const o = observationCards.find(x => x.id === id);
                if (o) o[key] = field.textContent;
            }
        }
    }, true);

    timelineContainer.addEventListener('keydown', e => {
        if (e.target.classList.contains('editable-field') && e.target.isContentEditable) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.target.blur();
            }
            if (e.key === 'Escape') {
                e.target.blur();
            }
        }
    });
    const addSessionBtn = document.getElementById('add-session-btn');
    if (addSessionBtn) {
        addSessionBtn.addEventListener('click', () => {
            addSession();
        });
    }
    let addObservationBtn = document.getElementById('add-observation-btn');
    if (!addObservationBtn && addSessionBtn) {
        addSessionBtn.insertAdjacentHTML('afterend', `<button id="add-observation-btn" class="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors">Adicionar Observação</button>`);
        addObservationBtn = document.getElementById('add-observation-btn');
    }
    if (addObservationBtn) {
        addObservationBtn.addEventListener('click', () => {
            addObservation();
        });
    }

    function renderSessionsChart(data) {
        const ctxEl = document.getElementById('sessionsByMonthChart');
        if (!ctxEl) return;
        if (chartInstance) chartInstance.destroy();

        const sessionsByMonth = data.reduce((acc, session) => {
            const month = session.month || 'Sem Mês';
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(sessionsByMonth);
        const dataCounts = Object.values(sessionsByMonth);

        chartInstance = new Chart(ctxEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels,
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
                    legend: { display: false },
                    title: { display: true, text: 'Distribuição de Sessões ao Longo dos Meses', font: { size: 16 }, color: '#374151' }
                },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }
        });
    }

    if (downloadCsvBtn) {
        downloadCsvBtn.addEventListener('click', () => {
            if (selectedDays.length === 0 || !startDateInput.value) {
                alert('Por favor, gere um cronograma antes de exportar para Excel.');
                return;
            }
            calculateScheduleDatesForSessions(selectedDays, startTimeInput.value, startDateInput.value);

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

            trainingData.forEach(session => {
                const row = [
                    session.fullDate || '',
                    session.day || '',
                    session.month || '',
                    session.module || '',
                    session.description || ''
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
    }

    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', async () => {
            loadingMessage && (loadingMessage.classList.remove('hidden'));
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
                    return await html2canvas(element, { scale: 1, useCORS: true });
                };

                const getScaledHeight = (canvas) => (canvas.height * usableWidth) / canvas.width;

                if (summaryTextToHide) summaryTextToHide.style.visibility = 'hidden';
                removeButtons.forEach(btn => btn.style.visibility = 'hidden');

                const summaryEl = document.getElementById('summary');
                const summaryCanvas = summaryEl ? await processElement(summaryEl) : null;
                if (summaryCanvas) {
                    const summaryHeight = getScaledHeight(summaryCanvas);
                    doc.addImage(summaryCanvas.toDataURL('image/png'), 'PNG', margin, currentY, usableWidth, summaryHeight);
                    currentY += summaryHeight + 10;
                }

                const monthSections = document.querySelectorAll('.month-section');
                for (const monthSection of monthSections) {
                    const titleEl = monthSection.querySelector('h3');
                    const gridEl = monthSection.querySelector('.grid');
                    if (!titleEl || !gridEl) continue;

                    const titleCanvas = await processElement(titleEl);
                    const gridCanvas = await processElement(gridEl);

                    if (!titleCanvas || !gridCanvas) continue;

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
                document.querySelectorAll('.remove-session-btn').forEach(btn => btn.style.visibility = 'visible');
                loadingMessage && (loadingMessage.classList.add('hidden'));
            }
        });
    }

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

    generateScheduleBtn && generateScheduleBtn.addEventListener('click', () => {
        calculateScheduleDatesForSessions(selectedDays, startTimeInput.value, startDateInput.value);
        renderTimeline();
        showPopup();
    });

    renderTimeline();

});
