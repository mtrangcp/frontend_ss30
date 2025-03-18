let books = [];
let carts = [];
let choice, check = true;

const showList = (arr) => {
    if (arr.length === 0) {
        alert("Danh sách rỗng");
        return;
    }
    let cateInput = prompt("Nhập tên danh mục muốn hiển thị sản phẩm: ").trim();
    let result = arr.filter(item => item.category.toLowerCase().includes(cateInput.toLowerCase()));
    result.length === 0 ? console.log(`Không tồn tại danh mục "${cateInput}"`) : console.table(result);
}

const checkNameExist = (arr, nameInput) => {
    return arr.findIndex(item => item.name === nameInput);
}

const addBook = (arr) => {
    let name1, price1, qty1, category1;
    do {
        name1 = prompt("Nhập tên sách: ");
    } while (!name1 || checkNameExist(arr, name1) !== -1);
    do {
        category1 = prompt("Nhập thể loại sách: ");
    } while (!category1);

    do {
        price1 = +prompt("Nhập giá sách: ");
    } while (!Number.isInteger(price1) || price1 <= 0);
    do {
        qty1 = +prompt("Nhập số lượng sách: ");
    } while (!Number.isInteger(qty1) || qty1 <= 0);

    let objBook = {
        id: arr.length + 1,
        name: name1,
        price: price1,
        quantity: qty1,
        category: category1
    }
    arr.push(objBook);
    alert("Thêm thành công");
}

const findOne = (arr) => {
    if (arr.length === 0) {
        alert("Danh sách rỗng");
        return;
    }
    let input;
    do {
        input = prompt("Tìm kiếm sách theo: \na. id\nb. name")?.toLowerCase();
    } while (input !== 'a' && input !== 'b');

    if (input === 'a') {
        let idInput;
        do {
            idInput = +prompt("Nhập id cần tìm kiếm: ");
        } while (!Number.isInteger(idInput) || idInput <= 0);

        let checkId = arr.findIndex(item => item.id === idInput);
        checkId === -1 ? console.log(`Không tồn tại sách có id: ${idInput}`) : console.table(arr[checkId]);

    } else {
        let nameInput;
        do {
            nameInput = prompt("Nhập tên sách cần tìm kiếm: ")?.toLowerCase();
        } while (!nameInput);

        let checkName = arr.filter(item => item.name.toLowerCase().includes(nameInput));
        checkName.length === 0 ? console.log(`Không tồn tại sách có tên: ${nameInput}`) : console.table(checkName);
    }
}

const buyBook = (arr, arrCart) => {
    if (arr.length === 0) {
        alert("Danh sách rỗng");
        return;
    }
    let idInput;
    do {
        idInput = +prompt("Nhập id sách muốn mua: ").trim();
    } while (!Number.isInteger(idInput) || idInput < 1);

    let index = arr.findIndex(item => item.id === idInput);
    if (index === -1) {
        console.log(`Không tồn tại sách có id: ${idInput}`);

    } else {
        if (arr[index].quantity === 0) {
            alert(`Sách hết hàng!`);
        } else {
            let qty;
            do {
                qty = +prompt(`Nhập số lượng muốn mua: `);
            } while (!Number.isInteger(qty) || qty < 1);

            if (arr[index].quantity < qty) {
                alert(`Sản phẩm "${arr[index].name}" không đủ số lượng.`);
            } else {
                let checkCartExist = arrCart.findIndex(item => item.name === arr[index].name);
                if (checkCartExist === -1) {
                    let newCart = {
                        id: arrCart.length + 1,
                        name: arr[index].name,
                        quantity: qty,
                        price: arr[index].price
                    }
                    arrCart.push(newCart);
                } else {
                    arrCart[checkCartExist].quantity += qty;
                }

                arr[index].quantity -= qty;
                console.log(`Đã thêm vào giỏ hàng!`);
                console.table(arrCart);
            }
        }
    }
}

const sortBookByPrice = (arr) => {
    if (arr.length === 0) {
        alert("Danh sách rỗng");
        return;
    }
    let choiceSort;
    do {
        choiceSort = prompt("a. Tăng dần \nb. Giảm dần").toLowerCase();
        check = choiceSort === 'a' || choiceSort === 'b' ? false : true;
    } while (check);
    choiceSort === 'a' ? arr.sort((a, b) => a.price - b.price) : arr.sort((a, b) => b.price - a.price);

    console.table(arr);
}

const totalAmount = (arr) => {
    if (arr.length === 0) {
        alert("Giỏ hàng rỗng");
        return false;
    }

    let total = arr.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    console.log("Tổng giỏ hàng: ", total);
}

const totalQtyBook = (arr) => {
    if (arr.length === 0) {
        alert("Danh sách rỗng");
        return false;
    }

    let total = arr.reduce((prev, curr) => prev + curr.quantity, 0);
    console.log("Tổng số lượng: ", total);
}

do {
    do {
        choice = +prompt("1. Hiển thị danh sách sách theo thể loại \n2. Thêm sách mới vào kho \n3. Tìm kiếm sách theo tên hoặc id \n4. Mua sách \n5. Sắp xếp sách theo giá \n6. Tổng số lượng sách đã mua và tổng tiền trong giỏ hàng \n7. Tổng số lượng sách trong kho \n8. Thoát ");
        check = Number.isInteger(choice) && choice >= 1 && choice <= 8 ? false : true;
    } while (check);

    switch (choice) {
        case 1: {
            showList(books);
            break;
        }
        case 2: {
            addBook(books);
            console.table(books);
            break;
        }
        case 3: {
            findOne(books);
            break;
        }
        case 4: {
            buyBook(books, carts);
            break;
        }
        case 5: {
            sortBookByPrice(books);
            break;
        }
        case 6: {
            totalAmount(carts);
            break;
        }
        case 7: {
            totalQtyBook(books);
            break;
        }
        case 8: {
            alert("Bạn chọn thoát!");
            break;
        }
    }

} while (choice !== 8);
