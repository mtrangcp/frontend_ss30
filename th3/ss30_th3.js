let phones = [];
let carts = [];
let choice, check = true;

const showList = (arr) => {
    if (arr.length === 0) {
        alert("Danh sách điện thoại rỗng");
        return;
    }
    let cateInput = prompt("Nhập tên hãng muốn hiển thị điện thoại: ").trim();
    let result = arr.filter(item => item.company.toLowerCase().includes(cateInput.toLowerCase()));
    result.length === 0 ? console.log(`Không tồn tại hãng "${cateInput}"`) : console.table(result);
}

const checkNameExist = (arr, nameInput) => {
    return arr.findIndex(item => item.name === nameInput);
}

const addPhone = (arr) => {
    let name1, price1, qty1, company1;
    do {
        name1 = prompt("Nhập tên điện thoại: ");
    } while (!name1 || checkNameExist(arr, name1) !== -1);
    do {
        company1 = prompt("Nhập hãng điện thoại: ");
    } while (!company1);

    do {
        price1 = +prompt("Nhập giá điện thoại: ");
    } while (!Number.isInteger(price1) || price1 <= 0);
    do {
        qty1 = +prompt("Nhập số lượng điện thoại: ");
    } while (!Number.isInteger(qty1) || qty1 <= 0);

    let objPhone = {
        id: arr.length + 1,
        name: name1,
        price: price1,
        quantity: qty1,
        company: company1
    }
    arr.push(objPhone);
    alert("Thêm thành công");
}

const findOne = (arr) => {
    if (arr.length === 0) {
        alert("Danh sách rỗng");
        return;
    }
    let input;
    do {
        input = prompt("Tìm kiếm điện thoại theo: \na. id\nb. name")?.toLowerCase();
    } while (input !== 'a' && input !== 'b');

    if (input === 'a') {
        let idInput;
        do {
            idInput = +prompt("Nhập id điện thoại cần tìm kiếm: ");
        } while (!Number.isInteger(idInput) || idInput <= 0);

        let index = arr.findIndex(item => item.id === idInput);
        index === -1 ? console.log(`Không tồn tại điện thoại có id: ${idInput}`) : console.table(arr[index]);

    } else {
        let nameInput;
        do {
            nameInput = prompt("Nhập tên điện thoại cần tìm kiếm: ")?.toLowerCase();
        } while (!nameInput);

        let index = arr.filter(item => item.name.toLowerCase().includes(nameInput));
        index.length === 0 ? console.log(`Không tồn tại điện thoại có tên: ${nameInput}`) : console.table(index);
    }
}

const buyPhone = (arr, arrCart) => {
    if (arr.length === 0) {
        alert("Danh sách điện thoại rỗng");
        return;
    }
    let idInput;
    do {
        idInput = +prompt("Nhập id điện thoại muốn mua: ").trim();
    } while (!Number.isInteger(idInput) || idInput < 1);

    let index = arr.findIndex(item => item.id === idInput);
    if (index === -1) {
        console.log(`Không tồn tại điện thoại có id: ${idInput}`);

    } else {
        if (arr[index].quantity === 0) {
            alert(`Điện thoại hết hàng!`);
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

const totalAmount = (arr) => {
    if (arr.length === 0) {
        alert("Mảng rỗng!");
        return false;
    }

    let total = arr.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    return total;
}

const payAllCart = (arrCart) => {
    if (arrCart.length === 0) {
        alert("Giỏ hàng rỗng");
        return;
    }
    let total = totalAmount(arrCart);
    let confirmPay = confirm(`Tổng giỏ hàng: ${total.toLocaleString()}. Có chắn chắn thanh toán không?`);
    if (confirmPay) {
        arrCart.length = 0;
        alert("Thanh toán thành công!");
    }
}

const sortPhoneByPrice = (arr) => {
    if (arr.length === 0) {
        alert("Danh sách điện thoại rỗng");
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

const totalQtyPhoneByCompany = (arrPhone) => {
    if (arrPhone.length === 0) {
        alert("Danh sách điện thoại rỗng");
        return false;
    }

    let qtyByCompany = [];
    let counts = [], qty = 0;
    for (const el of arrPhone) {
        let index = qtyByCompany.findIndex(item => item === el.company);
        if (index === -1) {
            qtyByCompany.push(el.company);
        }
    }

    for (const elCart of qtyByCompany) {
        qty = 0;
        for (const elPhone of arrPhone) {
            if (elCart === elPhone.company) qty += elPhone.quantity;
        }
        counts.push(qty);
    }

    for (let i = 0; i < counts.length; i++) {
        console.log(`${qtyByCompany[i]}: ${counts[i]}`);

    }

}

do {
    do {
        choice = +prompt("1. Hiển thị danh điện thoại điện thoại theo hãng \n2. Thêm điện thoại mới vào cửa hàng \n3. Tìm kiếm điện thoại theo tên hoặc id \n4. Mua điện thoại \n5. Thanh toán tất cả điện thoại trong giỏ hàng \n6. Sắp xếp điện thoại theo giá \n7. Hiển thị tổng số tiền của các điện thoại trong kho \n8. Hiển thị tổng số lượng điện thoại theo từng hãng \n9. Thoát ");
        check = Number.isInteger(choice) && choice >= 1 && choice <= 9 ? false : true;
    } while (check);

    switch (choice) {
        case 1: {
            showList(phones);
            break;
        }
        case 2: {
            addPhone(phones);
            console.table(phones);
            break;
        }
        case 3: {
            findOne(phones);
            break;
        }
        case 4: {
            buyPhone(phones, carts);
            break;
        }
        case 5: {
            payAllCart(carts);
            break;
        }
        case 6: {
            sortPhoneByPrice(phones);
            break;
        }
        case 7: {
            let total = totalAmount(phones);
            console.log(`Tổng tiền trong kho: ${total.toLocaleString()} `);
            break;
        }
        case 8: {
            totalQtyPhoneByCompany(phones);
            break;
        }
        case 9: {
            alert("Bạn chọn thoát!");
            break;
        }
    }

} while (choice !== 9);
