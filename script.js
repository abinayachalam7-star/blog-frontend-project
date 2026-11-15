const defaultBlogs = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    author: "Admin",
    date: "Nov 15, 2026",
    content: "Building responsive web applications requires clean semantic HTML, flexible CSS layouts, and interactive JavaScript."
  },
  {
    id: 2,
    title: "Why Consistency Matters in Learning Tech",
    author: "Abhi",
    date: "Nov 15, 2026",
    content: "Even 45 minutes of focused daily coding builds strong problem-solving fundamentals over time."
  }
];

function getBlogs() {
  const stored = localStorage.getItem("codomax_blogs");
  if (!stored) {
    localStorage.setItem("codomax_blogs", JSON.stringify(defaultBlogs));
    return defaultBlogs;
  }
  return JSON.parse(stored);
}

function renderHomeBlogs() {
  const container = document.getElementById("blog-feed");
  if (!container) return;
  const blogs = getBlogs();
  container.innerHTML = blogs.map(blog => `
    <div class="card">
      <h3>${blog.title}</h3>
      <div class="meta">By ${blog.author} • ${blog.date}</div>
      <p>${blog.content}</p>
    </div>
  `).join("");
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-pass").value;
  localStorage.setItem("codomax_user", JSON.stringify({ name, email, password }));
  alert("Registration successful! Please login.");
  window.location.href = "login.html";
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  localStorage.setItem("codomax_logged_in", email);
  window.location.href = "dashboard.html";
}

function renderDashboard() {
  const container = document.getElementById("dashboard-blogs");
  if (!container) return;
  const user = JSON.parse(localStorage.getItem("codomax_user") || '{"name":"Developer"}');
  const welcomeEl = document.getElementById("welcome-user");
  if (welcomeEl) welcomeEl.textContent = `Welcome, ${user.name}`;

  const blogs = getBlogs();
  container.innerHTML = blogs.map(blog => `
    <div class="card">
      <h3>${blog.title}</h3>
      <div class="meta">Published on ${blog.date}</div>
      <p>${blog.content}</p>
      <button class="btn-danger" onclick="deleteBlog(${blog.id})">Delete Post</button>
    </div>
  `).join("");
}

function handleCreateBlog(e) {
  e.preventDefault();
  const title = document.getElementById("blog-title").value;
  const author = document.getElementById("blog-author").value || "Author";
  const content = document.getElementById("blog-content").value;
  const blogs = getBlogs();
  blogs.unshift({
    id: Date.now(),
    title,
    author,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    content
  });
  localStorage.setItem("codomax_blogs", JSON.stringify(blogs));
  window.location.href = "dashboard.html";
}

function deleteBlog(id) {
  const blogs = getBlogs().filter(b => b.id !== id);
  localStorage.setItem("codomax_blogs", JSON.stringify(blogs));
  renderDashboard();
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeBlogs();
  renderDashboard();
});
