document.getElementById('strategyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const reportOutput = document.getElementById('reportOutput');

    // --- PREPARATION ---
    reportOutput.innerHTML = '';
    const existingButton = document.getElementById('printButton');
    if (existingButton) existingButton.remove();

    // --- HEADER ---
    reportOutput.innerHTML += `
        <div class="report-header">
            <img src="https://pbs.twimg.com/profile_images/1707503139249696768/CzcTuxe4_400x400.jpg" alt="Logo">
            <h2>المملكة العربية السعودية</h2>
            <h2>وزارة التعليم</h2>
        </div>
        <div class="report-title">نموذج تنفيذ استراتيجية مختصرة</div>
    `;

    const reportBody = document.createElement('div');
    reportBody.className = 'report-body';

    // --- FUNCTION TO CREATE A BLOCK ---
    function createBlock(title, content) {
        const block = document.createElement('div');
        block.className = 'report-block';
        block.innerHTML = `
            <div class="block-title">${title}</div>
            <div class="block-content">${content}</div>
        `;
        return block;
    }

    // --- BASIC INFO BLOCK ---
    let infoContent = '';
    const infoFields = [
        { label: 'إدارة التعليم', key: 'educationDepartment' },
        { label: 'اسم المدرسة', key: 'schoolName' },
        { label: 'تاريخ التنفيذ', key: 'implementationDate' },
        { label: 'المادة', key: 'subject' },
        { label: 'استراتيجية التعلم', key: 'learningStrategy' },
        { label: 'عدد المستفيدين', key: 'beneficiaries' },
        { label: 'المرحلة الدراسية', key: 'educationalStage' },
        { label: 'الفصل', key: 'class' },
        { label: 'اسم الدرس', key: 'lessonName' },
    ];
    infoFields.forEach(field => {
        infoContent += `<div class="info-row"><span class="info-label">${field.label}:</span><span class="info-value">${formData.get(field.key) || '-'}</span></div>`;
    });
    reportBody.appendChild(createBlock('البيانات الأساسية', infoContent));

    // --- OBJECTIVES BLOCK ---
    const objectives = formData.getAll('objectives[]').filter(o => o.trim() !== '');
    if (objectives.length > 0) {
        const list = `<ul>${objectives.map(o => `<li>${o}</li>`).join('')}</ul>`;
        reportBody.appendChild(createBlock('الأهداف', list));
    }

    // --- AIDS BLOCK ---
    const aids = formData.getAll('aids');
    if (aids.length > 0) {
        const aidLabels = aids.map(aid => form.querySelector(`input[value="${aid}"]`).parentElement.innerText.trim());
        const list = `<ul>${aidLabels.map(a => `<li>${a}</li>`).join('')}</ul>`;
        reportBody.appendChild(createBlock('الوسائل التعليمية المستخدمة', list));
    }

    // --- EVIDENCE BLOCK ---
    const evidence1 = formData.get('evidence1');
    const evidence2 = formData.get('evidence2');
    if (evidence1.size > 0 || evidence2.size > 0) {
        let imagesHTML = '<div class="report-images">';
        if (evidence1.size > 0) {
            imagesHTML += `<div class="evidence-image-container"><p>الشاهد الأول</p><img src="${URL.createObjectURL(evidence1)}"></div>`;
        }
        if (evidence2.size > 0) {
            imagesHTML += `<div class="evidence-image-container"><p>الشاهد الثاني</p><img src="${URL.createObjectURL(evidence2)}"></div>`;
        }
        imagesHTML += '</div>';
        reportBody.appendChild(createBlock('صور الشواهد', imagesHTML));
    }

    reportOutput.appendChild(reportBody);

    // --- FOOTER ---
    reportOutput.innerHTML += `
        <div class="report-footer">
            <div class="signature"><strong>المعلم</strong><p>${formData.get('teacherName')}</p></div>
            <div class="signature"><strong>مدير المدرسة</strong><p>${formData.get('principalName')}</p></div>
        </div>
    `;

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
