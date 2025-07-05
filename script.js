document.getElementById('strategyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const reportOutput = document.getElementById('reportOutput');

    // Clear previous report and buttons
    reportOutput.innerHTML = '';
    const existingButton = document.getElementById('printButton');
    if (existingButton) existingButton.remove();

    // --- REPORT HEADER ---
    const header = document.createElement('div');
    header.className = 'report-header';
    header.innerHTML = `
        <img src="https://edu-forms.com/img/logo.png" alt="Logo">
        <h2>المملكة العربية السعودية</h2>
        <h2>وزارة التعليم</h2>
    `;
    reportOutput.appendChild(header);

    // --- REPORT TITLE ---
    const title = document.createElement('div');
    title.className = 'report-title';
    title.textContent = 'نموذج تنفيذ استراتيجية مختصرة';
    reportOutput.appendChild(title);

    // --- REPORT BODY ---
    const reportBody = document.createElement('div');
    reportBody.className = 'report-body';

    // Function to create a row in the report table
    function createRow(label, value) {
        const row = document.createElement('div');
        row.className = 'report-row';
        row.innerHTML = `
            <div class="report-item">${label}</div>
            <div class="report-value">${value || '-'}</div>
        `;
        return row;
    }

    // --- BASIC INFO SECTION ---
    const infoSection = document.createElement('div');
    infoSection.className = 'report-section';
    infoSection.appendChild(createRow('إدارة التعليم', formData.get('educationDepartment')));
    infoSection.appendChild(createRow('اسم المدرسة', formData.get('schoolName')));
    infoSection.appendChild(createRow('تاريخ التنفيذ', formData.get('implementationDate')));
    infoSection.appendChild(createRow('المادة', formData.get('subject')));
    infoSection.appendChild(createRow('استراتيجية التعلم', formData.get('learningStrategy')));
    infoSection.appendChild(createRow('عدد المستفيدين', formData.get('beneficiaries')));
    infoSection.appendChild(createRow('المرحلة الدراسية', formData.get('educationalStage')));
    infoSection.appendChild(createRow('الفصل', formData.get('class')));
    infoSection.appendChild(createRow('اسم الدرس', formData.get('lessonName')));
    reportBody.appendChild(infoSection);

    // --- OBJECTIVES SECTION ---
    const objectives = formData.getAll('objectives[]').filter(o => o.trim() !== '');
    if (objectives.length > 0) {
        const objectivesSection = document.createElement('div');
        objectivesSection.className = 'report-section';
        const list = `<ul>${objectives.map(o => `<li>${o}</li>`).join('')}</ul>`;
        objectivesSection.appendChild(createRow('الأهداف', list));
        reportBody.appendChild(objectivesSection);
    }

    // --- AIDS SECTION ---
    const aids = formData.getAll('aids');
    if (aids.length > 0) {
        const aidsSection = document.createElement('div');
        aidsSection.className = 'report-section';
        const aidLabels = aids.map(aid => form.querySelector(`input[value="${aid}"]`).parentElement.innerText.trim());
        const list = `<ul>${aidLabels.map(a => `<li>${a}</li>`).join('')}</ul>`;
        aidsSection.appendChild(createRow('الوسائل التعليمية المستخدمة', list));
        reportBody.appendChild(aidsSection);
    }

    // --- EVIDENCE SECTION ---
    const evidence1 = formData.get('evidence1');
    const evidence2 = formData.get('evidence2');
    if (evidence1.size > 0 || evidence2.size > 0) {
        const evidenceSection = document.createElement('div');
        evidenceSection.className = 'report-section';
        let imagesHTML = '<div class="report-images">';
        if (evidence1.size > 0) {
            imagesHTML += `<div class="evidence-image-container"><p>الشاهد الأول</p><img src="${URL.createObjectURL(evidence1)}"></div>`;
        }
        if (evidence2.size > 0) {
            imagesHTML += `<div class="evidence-image-container"><p>الشاهد الثاني</p><img src="${URL.createObjectURL(evidence2)}"></div>`;
        }
        imagesHTML += '</div>';
        evidenceSection.appendChild(createRow('صور الشواهد', imagesHTML));
        reportBody.appendChild(evidenceSection);
    }

    reportOutput.appendChild(reportBody);

    // --- FOOTER SECTION ---
    const footer = document.createElement('div');
    footer.className = 'report-footer';
    footer.innerHTML = `
        <div class="signature"><strong>اسم المعلم</strong><p>${formData.get('teacherName')}</p></div>
        <div class="signature"><strong>اسم آخر مدير المدرسة</strong><p>${formData.get('principalName')}</p></div>
    `;
    reportOutput.appendChild(footer);

    // --- ACTIONS ---
    form.style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    reportOutput.style.display = 'block';

    const printButton = document.createElement('button');
    printButton.textContent = 'طباعة التقرير';
    printButton.id = 'printButton';
    printButton.onclick = () => window.print();
    reportOutput.parentNode.insertBefore(printButton, reportOutput.nextSibling);
});