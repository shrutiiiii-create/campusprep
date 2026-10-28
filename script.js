// =====================================
// CampusPrep - Main JavaScript
// =====================================


// 1. SEARCH RESOURCES ON HOMEPAGE

function searchResources() {
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".resources .card");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();

    cards.forEach(function(card) {
        const cardText = card.innerText.toLowerCase();

        if (cardText.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}


// 2. SEMESTER-WISE QUESTION PAPERS

const semesterFilter = document.getElementById("semesterFilter");
const subjectFilter = document.getElementById("subjectFilter");
const paperResults = document.getElementById("paperResults");


// Demo paper entries.
// Add more entries when you have the corresponding papers.

const papers = [
    {
        semester: "1",
        subject: "Mathematics",
        title: "Mathematics - Semester 1",
        file: ""
    },
    {
        semester: "2",
        subject: "Mathematics",
        title: "Mathematics - Semester 2",
        file: ""
    },
    {
        semester: "3",
        subject: "DBMS",
        title: "DBMS - Semester 3",
        file: "papers/dbms_sem3.pdf"
    },
    {
        semester: "3",
        subject: "DSA",
        title: "DSA - Semester 3",
        file: ""
    },
    {
        semester: "3",
        subject: "OOP",
        title: "OOP - Semester 3",
        file: ""
    },
    {
        semester: "4",
        subject: "DBMS",
        title: "DBMS - Semester 4",
        file: ""
    }
];


// 3. UPDATE SUBJECT DROPDOWN

function updateSubjects() {
    if (!semesterFilter || !subjectFilter) return;

    const selectedSemester = semesterFilter.value;

    const subjects = [...new Set(
        papers
            .filter(function(paper) {
                return !selectedSemester ||
                    paper.semester === selectedSemester;
            })
            .map(function(paper) {
                return paper.subject;
            })
    )];

    subjectFilter.innerHTML =
        '<option value="">All Subjects</option>';

    subjects.forEach(function(subject) {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectFilter.appendChild(option);
    });

    filterPapers();
}


// 4. FILTER AND DISPLAY PAPERS

function filterPapers() {
    if (!semesterFilter || !subjectFilter || !paperResults) return;

    const selectedSemester = semesterFilter.value;
    const selectedSubject = subjectFilter.value;

    const filteredPapers = papers.filter(function(paper) {
        return (
            (!selectedSemester ||
                paper.semester === selectedSemester) &&
            (!selectedSubject ||
                paper.subject === selectedSubject)
        );
    });

    if (filteredPapers.length === 0) {
        paperResults.innerHTML =
            "<p>No matching papers found.</p>";
        return;
    }

    paperResults.innerHTML = filteredPapers.map(function(paper) {
        let downloadButton = "";

        downloadButton = "<p>PDF coming soon.</p>";
        } else {
            downloadButton = `
                <p>Question paper PDF coming soon.</p>
            `;
        }

        return `
            <div class="paper-card">
                <h3>${paper.title}</h3>
                <p>Subject: ${paper.subject}</p>
                <p>Semester: ${paper.semester}</p>
                ${downloadButton}
            </div>
        `;
    }).join("");
}


// 5. CONNECT FILTERS

if (semesterFilter) {
    semesterFilter.addEventListener("change", function() {
        subjectFilter.value = "";
        updateSubjects();
    });
}

if (subjectFilter) {
    subjectFilter.addEventListener("change", filterPapers);
}


// 6. NAVIGATION SMOOTH SCROLLING

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener("click", function(event) {
        const targetId = link.getAttribute("href");

        if (targetId && targetId.length > 1) {
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });
});


// 7. INITIALIZE QUESTION PAPER SECTION

updateSubjects();