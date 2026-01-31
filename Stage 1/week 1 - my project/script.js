const form = document.getElementById("projectForm");
const container = document.getElementById("projectContainer");

// Ambil data dari localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// Render awal
renderProjects();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const projectName = form[0].value;
  const startDate = new Date(form[1].value);
  const endDate = new Date(form[2].value);
  const description = form[3].value;
  const imageFile = form[8].files[0];

  const techs = [];
  if (form[4].checked) techs.push("Node Js");
  if (form[5].checked) techs.push("React Js");
  if (form[6].checked) techs.push("Next Js");
  if (form[7].checked) techs.push("TypeScript");

  const duration =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const reader = new FileReader();
  reader.readAsDataURL(imageFile);

  reader.onload = function () {
    const project = {
      id: Date.now(),
      name: projectName,
      duration,
      description,
      techs,
      image: reader.result
    };

    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    renderProjects();
    form.reset();
  };
});

// Render semua project
function renderProjects() {
  container.innerHTML = "";

  projects.forEach((project) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card project-card">
          <img src="${project.image}" class="card-img-top">
          <div class="card-body">
            <h5>${project.name}</h5>
            <p class="text-muted small">durasi : ${project.duration} bulan</p>
            <p class="small">${project.description}</p>
            <p class="small fw-semibold">${project.techs.join(" • ")}</p>

            <div class="d-flex gap-2">
              <a href="${project.image}"
                 download="${project.name}.png"
                 class="btn btn-gradient btn-sm w-50">
                Download
              </a>
              <button class="btn btn-gradient btn-sm w-50"
                onclick="deleteProject(${project.id})">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// Delete project
function deleteProject(id) {
  projects = projects.filter(project => project.id !== id);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
}
