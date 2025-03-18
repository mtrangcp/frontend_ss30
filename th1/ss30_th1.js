let products = [
    {
        id: 1,
        name: "mèn mén",
        price: 20000,
        quantity: 20,
        category: "Món ăn dân tộc Mông"
    },
    {
        id: 2,
        name: "mứt",
        price: 80000,
        quantity: 21,
        category: "Món ăn dân tộc Kinh"
    },
    {
        id: 3,
        name: "cơm lam",
        price: 40000,
        quantity: 15,
        category: "Món ăn dân tộc Mông"
    },
    {
        id: 4,
        name: "bánh đậu xanh",
        price: 60000,
        quantity: 30,
        category: "Món ăn dân tộc Kinh"
    }
];

let carts = [];
let choice, check = true;

const showList = (arr) => {
    let cateInput = prompt("Nhập tên danh mục muốn hiển thị sản phẩm: ").trim();
    let result = arr.filter(item => item.category.toLowerCase().includes(cateInput.toLowerCase()));
    result.length === 0 ? console.log(`Không tồn tại danh mục "${cateInput}"`) : console.table(result);
}

const addCart = (arrCart, arrProduct) => {
    let idInput;
    do {
        idInput = +prompt("Nhập id sản phẩm: ").trim();
        check = Number.isInteger(idInput) && idInput > 0 ? false : true;
    } while (check);
    let index = arrProduct.findIndex(item => item.id === idInput);
    if (index === -1) {
        console.log(`Không tồn tại sản phẩm có id: ${idInput}`);

    } else {
        if (arrProduct[index].quantity === 0) {
            alert(`Sản phẩm hết hàng!`);
        } else {
            let qty;
            do {
                qty = +prompt(`Nhập số lượng muốn mua: `);
                check = Number.isInteger(qty) && qty > 0 ? false : true;
            } while (check);

            if (arrProduct[index].quantity < qty) {
                alert(`Sản phẩm "${arrProduct[index].name}" không đủ số lượng.`);
            } else {
                let checkCartExist = arrCart.findIndex(item => item.name === arrProduct[index].name);
                if (checkCartExist === -1) {
                    let newCart = {
                        id: arrCart.length + 1,
                        name: arrProduct[index].name,
                        quantity: qty,
                        price: arrProduct[index].price
                    }
                    arrCart.push(newCart);
                } else {
                    arrCart[checkCartExist].quantity += qty;
                }

                arrProduct[index].quantity -= qty;
                console.log(`Đã thêm vào giỏ hàng!`);
                console.table(arrCart);
            }
        }
    }
}

const sortArr = (arr) => {
    let choiceSort;
    do {
        choiceSort = prompt("a. Tăng dần \nb. Giảm dần").toLowerCase();
        check = choiceSort === 'a' || choiceSort === 'b' ? false : true;
    } while (check);
    choiceSort === 'a' ? arr.sort((a, b) => a.price - b.price) : arr.sort((a, b) => b.price - a.price);

    console.table(arr);
}

const totalAmount = (arr) => {
    if (carts.length === 0) {
        alert("Giỏ hàng rỗng");
        return false;
    }
    let total = 0;
    for (const el of carts) {
        total += el.quantity * el.price;
    }
    console.log("Tổng giỏ hàng: ", total);
}

do {
    do {
        choice = +prompt("1. Hiển thị sản phẩm theo tên danh mục. \n2. Chọn sản phẩm để mua theo id. \n3. Sắp xếp sản phẩm theo giá \n4. Tính tiền giỏ hàng. \n5. Thoát ");
        check = Number.isInteger(choice) && choice > 0 && choice <= 5 ? false : true;
    } while (check);

    switch (choice) {
        case 1: {
            showList(products);
            break;
        }
        case 2: {
            addCart(carts, products);
            break;
        }
        case 3: {
            sortArr(products);
            break;
        }
        case 4: {
            totalAmount(carts);
            break;
        }
        case 5: {
            alert("Bạn chọn thoát!");
            break;
        }
    }

} while (choice !== 5);

