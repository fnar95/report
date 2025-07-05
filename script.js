document.getElementById('strategyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const reportOutput = document.getElementById('reportOutput');

    // Clear previous report and buttons
    reportOutput.innerHTML = '';
    const existingButton = document.getElementById('printButton');
    if (existingButton) {
        existingButton.remove();
    }

    // Header
    const header = document.createElement('div');
    header.className = 'report-header';
    header.innerHTML = `
        <img src="https://edu-forms.com/img/logo.png" alt="Logo" style="height: 50px;">
        <h2>المملكة العربية السعودية</h2>
        <h2>وزارة التعليم</h2>
    `;
    reportOutput.appendChild(header);

    // Title
    const title = document.createElement('div');
    title.className = 'report-title';
    title.textContent = 'نموذج تنفيذ استراتيجية مختصرة';
    reportOutput.appendChild(title);

    // Function to create a section
    function createSection(items) {
        const section = document.createElement('div');
        section.className = 'report-section';
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'report-item';
            itemDiv.textContent = item.label;

            const valueDiv = document.createElement('div');
            valueDiv.className = 'report-value';
            valueDiv.textContent = item.value;
            
            section.appendChild(itemDiv);
            section.appendChild(valueDiv);
        });
        reportOutput.appendChild(section);
    }
    
    // Basic Info
    createSection([
        { label: 'إدارة التعليم', value: formData.get('educationDepartment') },
        { label: 'اسم المدرسة', value: formData.get('schoolName') },
        { label: 'تاريخ التنفيذ', value: formData.get('implementationDate') },
        { label: 'المادة', value: formData.get('subject') },
        { label: 'استراتيجية التعلم', value: formData.get('learningStrategy') },
        { label: 'عدد المستفيدين', value: formData.get('beneficiaries') },
        { label: 'المرحلة الدراسية', value: formData.get('educationalStage') },
        { label: 'الفصل', value: formData.get('class') },
        { label: 'اسم الدرس', value: formData.get('lessonName') },
    ]);

    // Objectives
    const objectives = formData.getAll('objectives[]').filter(o => o.trim() !== '');
    if (objectives.length > 0) {
        const objectivesSection = document.createElement('div');
        objectivesSection.className = 'report-section';
        objectivesSection.innerHTML = `
            <div class="report-item full-width"><strong>الأهداف</strong></div>
            <div class="report-value full-width report-list">
                <ul>${objectives.map(o => `<li>${o}</li>`).join('')}</ul>
            </div>
        `;
        reportOutput.appendChild(objectivesSection);
    }

    // Aids
    const aids = formData.getAll('aids');
    if (aids.length > 0) {
        const aidsSection = document.createElement('div');
        aidsSection.className = 'report-section';
        const aidLabels = aids.map(aid => form.querySelector(`input[value="${aid}"]`).parentElement.innerText);
        aidsSection.innerHTML = `
            <div class="report-item full-width"><strong>الوسائل التعليمية المستخدمة</strong></div>
            <div class="report-value full-width report-list">
                <ul>${aidLabels.map(a => `<li>${a}</li>`).join('')}</ul>
            </div>
        `;
        reportOutput.appendChild(aidsSection);
    }
    
    // Evidence Photos
    const evidence1 = formData.get('evidence1');
    const evidence2 = formData.get('evidence2');
    if (evidence1.size > 0 || evidence2.size > 0) {
        const evidenceSection = document.createElement('div');
        evidenceSection.className = 'report-section';
        let evidenceHTML = '<div class="report-item full-width"><strong>صور الشواهد</strong></div><div class="report-value full-width report-images">';
        
        if (evidence1.size > 0) {
            const imgUrl1 = URL.createObjectURL(evidence1);
            evidenceHTML += `<div class="evidence-image-container"><p>الشاهد الأول</p><img src="${imgUrl1}" alt="الشاهد الأول"></div>`;
        }
        if (evidence2.size > 0) {
            const imgUrl2 = URL.createObjectURL(evidence2);
            evidenceHTML += `<div class="evidence-image-container"><p>الشاهد الثاني</p><img src="${imgUrl2}" alt="الشاهد الثاني"></div>`;
        }

        evidenceHTML += '</div>';
        evidenceSection.innerHTML = evidenceHTML;
        reportOutput.appendChild(evidenceSection);
    }

    // Footer (Signatures)
    const footer = document.createElement('div');
    footer.className = 'report-footer';
    footer.innerHTML = `
        <div class="signature">
            <p>اسم المعلم</p>
            <p>${formData.get('teacherName')}</p>
        </div>
        <div class="signature">
            <p>اسم آخر مدير المدرسة</p>
            <p>${formData.get('principalName')}</p>
        </div>
    `;
    reportOutput.appendChild(footer);

    // Hide form and show report
    form.style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    reportOutput.style.display = 'block';

    // Add print button
    const printButton = document.createElement('button');
    printButton.textContent = 'طباعة التقرير';
    printButton.id = 'printButton';
    printButton.onclick = () => window.print();
    reportOutput.parentNode.insertBefore(printButton, reportOutput.nextSibling);
});