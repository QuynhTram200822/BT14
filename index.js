const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close');


let students = [
];
let currentEditingStudent = null;

function addStudent(event) {
  event.preventDefault();
  // Lấy giá trị từ form
  let name = document.getElementById('name').value;
  let studentCode = document.getElementById('studentCode').value;
  let email = document.getElementById('email').value;
  let department = document.getElementById('department').value;
  let gender = document.getElementById('gender').value;
  let birthDate = document.getElementById('birthDate').value;

  // Tạo đối tượng sinh viên mới
  let newStudent = {
    name: name,
    studentCode: studentCode,
    email: email,
    department: department,
    gender: gender,
    birthDate: birthDate,
  };

  students.push(newStudent);
  document.getElementById('myForm').reset();
  renderStudentList();
}
document.getElementById('myForm').addEventListener('submit', addStudent);

// Hàm để render danh sách sinh viên vào HTML
function renderStudentList() {
  let studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';

  // Tạo một bảng để hiển thị danh sách sinh viên
  let table = document.createElement('table');
  let headerRow = table.insertRow();
  let headers = ['Name', 'Student Code', 'Email', 'Department', 'Gender', 'Birth Date', 'Action'];

  // Tạo header của bảng
  headers.forEach(function (headerText) {
    let header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  // Thêm các sinh viên vào bảng
  students.forEach(function (student) {
    let row = table.insertRow();
    Object.keys(student).forEach(function (key) {
      let cell = row.insertCell();
      cell.textContent = student[key];
    });
    // Tạo nút Edit
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
      // Điền dữ liệu của hàng vào modal form
      document.getElementById('editName').value = student.name;
      document.getElementById('editStudentCode').value = student.studentCode;
      document.getElementById('editEmail').value = student.email;
      document.getElementById('editDepartment').value = student.department;
      document.getElementById('editGender').value = student.gender;
      document.getElementById('editBirthDate').value = student.birthDate;

      currentEditingStudent = student;
      // Hiển thị modal
      modal.style.display = "block";
    });
    // Tạo nút Remove
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function () {

    });
    let actionCell = row.insertCell();
    actionCell.appendChild(editButton);
    actionCell.appendChild(removeButton);
  });
  studentListDiv.appendChild(table);
}

closeBtn.onclick = function () {
  modal.style.display = "none";
}

// Xử lý khi nhấn Update trên modal form để cập nhật sinh viên
function updateStudent() {
  // Lấy dữ liệu từ các trường input trong modal
  let editedName = document.getElementById('editName').value;
  let editedStudentCode = document.getElementById('editStudentCode').value;
  let editedEmail = document.getElementById('editEmail').value;
  let editedDepartment = document.getElementById('editDepartment').value;
  let editedGender = document.getElementById('editGender').value;
  let editedBirthDate = document.getElementById('editBirthDate').value;

  // Cập nhật thông tin của sinh viên đang chỉnh sửa
  currentEditingStudent.name = editedName;
  currentEditingStudent.studentCode = editedStudentCode;
  currentEditingStudent.email = editedEmail;
  currentEditingStudent.department = editedDepartment;
  currentEditingStudent.gender = editedGender;
  currentEditingStudent.birthDate = editedBirthDate;

  renderStudentList();

  modal.style.display = "none";
}
