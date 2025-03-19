let users = [], courses = [];
let choice, check = true;

do {
    do {
        choice = +prompt("1. Quản lý khóa học \n2. Quản lý người dùng \n3. Thoát");
        check = Number.isInteger(choice) && choice >= 1 && choice <= 3 ? false : true;
    } while (check);

    switch (choice) {
        case 1: {
            let choose;
            do {
                choose = +prompt("a. Thêm khóa học \nb. Tìm kiếm khóa học theo tên. \nc. Xóa khóa học \nd. Thoát");

                switch (choose) {
                    case 'a':
                    case 'A': {
                        let name1, instructor1;
                        do {
                            name1 = prompt("Nhập tên khóa học: ")?.trim();
                        } while (!name1);

                        do {
                            instructor1 = prompt("Nhập giáo viên dạy khóa học: ")?.trim();
                        } while (!instructor1);

                        let newObj = {
                            id: courses.length + 1,
                            name: name1,
                            instructor: instructor1,
                            students: []
                        }

                        courses.push(newObj);
                        alert("Thêm khóa học thành công");
                        console.table(courses);

                        break;
                    }
                    case 'b':
                    case 'B': {
                        let searchName;
                        do {
                            searchName = prompt("Nhập tên khóa học: ")?.trim().toLowerCase();
                        } while (!searchName);

                        let result = courses.find(item => item.name.toLowerCase().includes(searchName));
                        result.length === 0 ? console.log(`Không tồn tại khóa học: ${searchName}`) : console.table(result);
                        break;
                    }
                    case 'c':
                    case 'C': {
                        let idDel;
                        do {
                            idDel = +prompt('Nhập id khóa học muốn xóa: ');
                        } while (!Number.isInteger(idDel) || idDel <= 0);

                        let index = courses.findIndex(item => item.id === idDel);
                        if (index === -1) {
                            console.log(`Không tồn tại khóa học có id: ${idDel}`);

                        } else {
                            courses.splice(index, 1);

                            // xóa tất cả id khóa học khỏi danh sách registeredCourses người dùng đã đăng ký
                        }
                        break;
                    }
                    default: {
                        alert('Lựa chọn không hợp lệ!');
                        break;
                    }
                }
            } while (choose !== 'd' && choose !== 'D');
            break;
        }
        case 2: {
            let choose;
            do {
                choose = +prompt("a. Thêm người dùng mới \nb. Đăng ký khóa học. \nc. Hủy đăng ký khóa học. \nd. Hiển thị danh sách khóa học của một người dùng. \ne. Thoát");

                switch (choose) {
                    case 'a':
                    case 'A': {
                        let name1;
                        do {
                            name1 = prompt("Nhập tên người dùng: ")?.trim();
                        } while (!name1);

                        let newObj = {
                            id: users.length + 1,
                            name: name1,
                            registeredCourses: []
                        }

                        users.push(newObj);
                        alert("Thêm người dùng thành công");
                        console.table(users);
                        break;
                    }
                    case 'b':
                    case 'B': {
                        let idUser, idCourse;
                        do {
                            idUser = +prompt("Nhập id người dùng muốn đăng ký: ")?.trim();
                        } while (!Number.isInteger(idUser) && idUser <= 0);
                        do {
                            idCourse = +prompt("Nhập id khóa học muốn đăng ký: ")?.trim();
                        } while (!Number.isInteger(idCourse) && idCourse <= 0);

                        let indexUser = courses.findIndex(item => item.id === idUser);
                        let indexCourse = courses.findIndex(item => item.id === idCourse);
                        if (indexUser !== -1) {
                            if (indexCourse !== -1) {
                                users[indexUser].registeredCourses.push(courses[idCourse]);
                                console.log(`Người dùng '${users[idUser].name}' đã thêm khóa học '${courses[indexCourse].name}' thành công!`);

                            } else {
                                console.log(`Không tồn tại khóa học có id: ${idCourse}`);
                            }
                        } else {
                            console.log(`Không tồn tại người dùng có id: ${idUser}`);
                        }
                        break;
                    }
                    case 'c':
                    case 'C': {
                        let idCourseDel;
                        do {
                            idCourseDel = +prompt('Nhập id khóa học muốn hủy: ');
                        } while (!Number.isInteger(idCourseDel) || idCourseDel <= 0);

                        let index = courses.findIndex(item => item.id === idCourseDel);
                        if (index === -1) {
                            console.log(`Không tồn tại khóa học có id: ${idCourseDel}`);

                        } else {
                            // huy dang ki khoa hoc


                        }
                        break;
                    }
                    case 'd':
                    case 'D': {
                        let idUser;
                        do {
                            idUser = +prompt("Nhập id người dùng muốn đăng ký: ")?.trim();
                        } while (!Number.isInteger(idUser) && idUser <= 0);

                        let indexUser = courses.findIndex(item => item.id === idUser);

                        indexUser === -1 ? console.log(`Không tồn tại người dùng có id: ${idUser}`) : console.table(users[indexUser].registeredCourses);

                        break;
                    }

                    default: {
                        alert('Lựa chọn không hợp lệ!');
                        break;
                    }
                }
            } while (choose !== 'e' && choose !== 'E');
            break;
        }
        case 3: {
            alert("Bạn chọn thoát!");
            break;
        }
    }
} while (choice !== 3);
