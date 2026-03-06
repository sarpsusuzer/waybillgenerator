document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        supplier: {
            name: "TURKUVAZ PLASTİK VE TEMİZLİK ÜRÜNLERİ SANAYİ TİCARET A.Ş.",
            vkn: "8710506698",
            taxOffice: "ANADOLU KURUMLAR VERGİ DAİRESİ MÜDÜRLÜĞÜ",
            address: "E-5 YOLU ÜZERİ AKOVA / HENDEK/ SAKARYA\nTel: (216) 435 72 09 Fax: (216)4357266\nWeb: www.turkuvazplastik.com\nE-Posta: info@turkuvazplastik.com",
            ticaretNo: "672524",
            subNo: "S4"
        },
        recipient: {
            name: "BİM BİRLEŞİK MAĞAZALAR A.Ş.- AYRANCILAR-İZMİR",
            vkn: "1750051846",
            ettn: "2E92E7D7-9696-4702-BA37-8B32F5F72246",
            address: "AYRANCILAR\nKAZIM KARABEKİR MAH. BEKİR SAYDAM CAD. / NO:75/1\nTORBALI\n35860 AYRANCILAR/ İZMİR",
            web: "www.bim.com.tr",
            email: "ezgi.kaya@bim.com.tr",
            tel: "+90 (232) 854 76 53"
        },
        waybill: {
            no: "HNE20260000002392",
            date: "2026-01-21",
            time: "14:50:37",
            type: "SEVK",
            scenario: "TEMELIRSALIYE"
        },
        items: [
            { id: 1, code: "5.51.06.99.001.1", multiCode: "1300568", description: "ISLAK HAVLU - AGU BABY / 56x24", quantity: "10" }
        ],
        relatedDocs: [
            { id: 1, no: "C89B5021-68B7-4CC0-940E-BEF49BED6C5B", date: "2026-01-21", type: "XSLT", note: "" }
        ],
        logistics: {
            company: "İZLOG NAKLİYE VE LOJİSTİK HİZ.LTD.ŞTİ.",
            vkn: "4840751039",
            plate: "54 LB 973",
            trailer: "54 ABG 729",
            driver: "Şoför ALİ ATMACA , TCKN: 36740076968"
        }
    };

    let zoomLevel = 100;

    // Selectors
    const itemsContainer = document.getElementById('items-container');
    const docsContainer = document.getElementById('docs-container');
    const previewItemsBody = document.getElementById('preview-items-body');
    const previewDocsBody = document.getElementById('preview-docs-body');
    const waybillPaper = document.getElementById('waybill-paper');
    const zoomLevelEl = document.getElementById('zoom-level');

    // Initialization
    function init() {
        fillForms();
        renderItems();
        renderDocs();
        updatePreview();
        setupEventListeners();
    }

    // Fill form fields with state
    function fillForms() {
        document.getElementById('v-name').value = state.supplier.name;
        document.getElementById('v-vkn').value = state.supplier.vkn;
        document.getElementById('v-tax-office').value = state.supplier.taxOffice;
        document.getElementById('v-address').value = state.supplier.address;

        document.getElementById('r-name').value = state.recipient.name;
        document.getElementById('r-vkn').value = state.recipient.vkn;
        document.getElementById('r-ettn').value = state.recipient.ettn;
        document.getElementById('r-address').value = state.recipient.address;

        document.getElementById('w-no').value = state.waybill.no;
        document.getElementById('w-date').value = state.waybill.date;
        document.getElementById('w-time').value = state.waybill.time;
        document.getElementById('w-type').value = state.waybill.type;

        document.getElementById('l-company').value = state.logistics.company;
        document.getElementById('l-plate').value = state.logistics.plate;
        document.getElementById('l-trailer').value = state.logistics.trailer;
        document.getElementById('l-driver').value = state.logistics.driver;
    }

    // Render item inputs in sidebar
    function renderItems() {
        itemsContainer.innerHTML = '';
        state.items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'item-row-input';
            div.innerHTML = `
                <div style="flex: 1; display: grid; gap: 4px;">
                    <input type="text" value="${item.description}" placeholder="Item Description" data-index="${index}" data-key="description">
                    <div style="display: flex; gap: 4px;">
                        <input type="text" value="${item.code}" placeholder="Stok Kodu" style="flex: 2" data-index="${index}" data-key="code">
                        <input type="text" value="${item.multiCode}" placeholder="Multi Kod" style="flex: 1" data-index="${index}" data-key="multiCode">
                        <input type="number" value="${item.quantity}" placeholder="Qty" style="flex: 1" data-index="${index}" data-key="quantity">
                    </div>
                </div>
                <button class="remove-item btn-remove" data-index="${index}">×</button>
            `;
            itemsContainer.appendChild(div);
        });
    }

    // Render document inputs
    function renderDocs() {
        docsContainer.innerHTML = '';
        state.relatedDocs.forEach((doc, index) => {
            const div = document.createElement('div');
            div.className = 'item-row-input';
            div.innerHTML = `
                <div style="flex: 1; display: grid; gap: 4px;">
                    <input type="text" value="${doc.no}" placeholder="Doc No" data-index="${index}" data-key="no">
                    <div style="display: flex; gap: 4px;">
                        <input type="date" value="${doc.date}" style="flex: 2" data-index="${index}" data-key="date">
                        <input type="text" value="${doc.type}" placeholder="Type" style="flex: 1" data-index="${index}" data-key="type">
                    </div>
                </div>
                <button class="remove-doc btn-remove" data-index="${index}">×</button>
            `;
            docsContainer.appendChild(div);
        });
    }

    // Update preview with state
    function updatePreview() {
        // Supplier
        document.getElementById('preview-v-name-main').textContent = state.supplier.name.split(' ')[0];
        document.getElementById('preview-v-details').innerHTML = `
            <strong>${state.supplier.name}</strong><br>
            ${state.supplier.address.replace(/\n/g, '<br>')}<br>
            Vergi Dairesi: ${state.supplier.taxOffice}<br>
            VKN: ${state.supplier.vkn}
        `;

        // Recipient
        document.getElementById('preview-r-details').innerHTML = `
            <strong>${state.recipient.name}</strong><br>
            ${state.recipient.address.replace(/\n/g, '<br>')}<br>
            VKN: ${state.recipient.vkn}
        `;

        // Waybill
        document.getElementById('preview-w-no').textContent = state.waybill.no;
        document.getElementById('preview-w-date').textContent = state.waybill.date;
        document.getElementById('preview-w-time').textContent = state.waybill.time;
        document.getElementById('preview-w-type').textContent = state.waybill.type;
        document.getElementById('preview-s-date').textContent = state.waybill.date;

        // Logistics
        document.getElementById('preview-l-details').innerHTML = `
            Taşıyıcı Firma: VKN: ${state.logistics.vkn}, ${state.logistics.company}<br>
            Araç plaka numarası: ${state.logistics.plate}<br>
            Dorse plaka numarası: ${state.logistics.trailer}<br>
            Şoför: ${state.logistics.driver}
        `;

        // Items Table
        previewItemsBody.innerHTML = '';
        state.items.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.code}</td>
                <td>${item.multiCode}</td>
                <td>${item.description}</td>
                <td style="text-align: right">${item.quantity}</td>
            `;
            previewItemsBody.appendChild(tr);
        });

        // Docs Table
        previewDocsBody.innerHTML = '';
        state.relatedDocs.forEach((doc) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${doc.no}</td>
                <td>${doc.date}</td>
                <td>${doc.type}</td>
                <td>${doc.note || ''}</td>
            `;
            previewDocsBody.appendChild(tr);
        });
    }

    // Event Listeners
    function setupEventListeners() {
        // Input sync
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = e.target.id;
                const value = e.target.value;

                if (id.startsWith('v-')) {
                    const key = id.replace('v-', '');
                    const stateKey = key === 'name' ? 'name' : (key === 'tax-office' ? 'taxOffice' : key);
                    state.supplier[stateKey] = value;
                } else if (id.startsWith('r-')) {
                    const key = id.replace('r-', '');
                    state.recipient[key] = value;
                } else if (id.startsWith('w-')) {
                    const key = id.replace('w-', '');
                    state.waybill[key] = value;
                } else if (id.startsWith('l-')) {
                    const key = id.replace('l-', '');
                    state.logistics[key] = value;
                }
                updatePreview();
            });
        });

        // Item input sync
        itemsContainer.addEventListener('input', (e) => {
            if (e.target.dataset.index !== undefined) {
                const index = parseInt(e.target.dataset.index);
                const key = e.target.dataset.key;
                state.items[index][key] = e.target.value;
                updatePreview();
            }
        });

        // Doc input sync
        docsContainer.addEventListener('input', (e) => {
            if (e.target.dataset.index !== undefined) {
                const index = parseInt(e.target.dataset.index);
                const key = e.target.dataset.key;
                state.relatedDocs[index][key] = e.target.value;
                updatePreview();
            }
        });

        // Add item
        document.getElementById('add-item-btn').addEventListener('click', () => {
            state.items.push({ id: state.items.length + 1, code: "", multiCode: "", description: "", quantity: "1" });
            renderItems();
            updatePreview();
        });

        // Add doc
        document.getElementById('add-doc-btn').addEventListener('click', () => {
            state.relatedDocs.push({ id: state.relatedDocs.length + 1, no: "", date: "", type: "XSLT", note: "" });
            renderDocs();
            updatePreview();
        });

        // Remove item
        itemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const index = parseInt(e.target.dataset.index);
                state.items.splice(index, 1);
                renderItems();
                updatePreview();
            }
        });

        // Remove doc
        docsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-doc')) {
                const index = parseInt(e.target.dataset.index);
                state.relatedDocs.splice(index, 1);
                renderDocs();
                updatePreview();
            }
        });

        // Zoom
        document.getElementById('zoom-in').addEventListener('click', () => {
            zoomLevel += 10;
            updateZoom();
        });
        document.getElementById('zoom-out').addEventListener('click', () => {
            if (zoomLevel > 50) zoomLevel -= 10;
            updateZoom();
        });

        // Export
        document.getElementById('export-btn').addEventListener('click', () => {
            window.print();
        });
    }

    function updateZoom() {
        waybillPaper.style.transform = `scale(${zoomLevel / 100})`;
        zoomLevelEl.textContent = `${zoomLevel}%`;
    }

    init();
});
