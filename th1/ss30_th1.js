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

do {
    do {
        choice = +prompt("1. Hiển thị sản phẩm theo tên danh mục. \n2. Chọn sản phẩm để mua theo id. \n3. Sắp xếp sản phẩm theo giá \n4. Tính tiền giỏ hàng. \n5. Thoát ");
        check = Number.isInteger(choice) && choice > 0 && choice <= 5 ? false : true;
    } while (check);

    switch (choice) {
        case 1: {
            let cateInput = prompt("Nhập tên danh mục muốn hiển thị sản phẩm: ");
            let result = products.filter(item => item.category.toLowerCase().includes(cateInput.toLowerCase()));
            result.length === 0 ? console.log(`Không tồn tại danh mục ${cateInput}`) : console.table(result);
            break;
        }
        case 2: {
            let idInput;
            do {
                idInput = +prompt("Nhập id sản phẩm: ").trim();
                check = Number.isInteger(idInput) && idInput > 0 ? false : true;
            } while (check);
            let index = products.findIndex(item => item.id === idInput);
            if (index === -1) {
                console.log(`Không tồn tại sản phẩm có id: ${idInput}`);

            } else {
                if (products[index].quantity === 0) {
                    alert(`Sản phẩm hết hàng!`);
                } else {
                    let qty;
                    do {
                        qty = +prompt(`Nhập số lượng muốn mua: `);
                        check = Number.isInteger(qty) && qty > 0 ? false : true;
                    } while (check);

                    if (products[index].quantity < qty) {
                        alert(`Sản phẩm "${products[index].name}" không đủ số lượng.`);
                    } else {
                        let newCart = {
                            id: carts.length + 1,
                            name: products[index].name,
                            quantity: qty,
                            price: products[index].price
                        }
                        carts.push(newCart);
                        products[index].quantity -= qty;
                        console.log(`Đã thêm vào giỏ hàng!`);
                        console.table(carts);
                    }
                }
            }
            break;
        }
        case 3: {
            let choiceSort;
            do {
                choiceSort = prompt("a. Tăng dần \nb. Giảm dần").toLowerCase();
                check = choiceSort === 'a' || choiceSort === 'b' ? false : true;
            } while (check);
            choiceSort === 'a' ? products.sort((a, b) => a.price - b.price) : products.sort((a, b) => b.price - a.price);

            console.table(products);
            break;
        }
        case 4: {
            if (carts.length === 0) {
                alert("Giỏ hàng rỗng");
                break;
            }
            let total = 0;
            for (const el of carts) {
                total += el.quantity * el.price;
            }
            console.log("Tổng giỏ hàng: ", total);
            break;
        }
        case 5: {
            alert("Bạn chọn thoát!");
            break;
        }
    }

} while (choice !== 5);

