var products2 = [];

async function fetchCSV() {
    const response = await fetch('items.csv');
    const data = await response.text();
    return data;
}

// Function to parse CSV data
function parseCSV(csv) {
    const lines = csv.split('\n');
    const products = [];

    // Assuming CSV has columns in the order: id, name, color2, descr, price, images, category
    for (let i = 0; i < lines.length; i++) {


        const [id, name, color2, descr, price, images] = lines[i].split(',');

        if (images && images != "" && id && id != "") {

            // Array
            const clothingArray = ['Tshirt', 'Hoodie', 'Jumper'];

            // The text or name for checking
            const givenText = name;

            // Variable to store the matched word
            var matchedWord = "";

            // Loop through the array to find a match
            clothingArray.forEach(clothing => {
                if (givenText.includes(clothing)) {
                    matchedWord = clothing;
                }
            });

            // Check if a match was found
            if (matchedWord !== null && matchedWord != "") {
                matchedWord = matchedWord;
            }else{
                matchedWord = "";
            }

            products.push({
                id: parseInt(id),
                name: name,
                color1: color2,
                desc: descr,
                price: price,
                image: images.trim(), // Remove extra spaces
                category: matchedWord,
            });
        }
    }

    return products;
}


// Fetch CSV and update products
fetchCSV()
    .then(parseCSV)
    .then(products => {
        products2 = products;
        sessionStorage.setItem('products2',JSON.stringify(products2));
    })
    .catch(error => {
        console.log(error);
    });

window.onload = function () {
    if(sessionStorage.getItem('products2')){
        products2 = JSON.parse(sessionStorage.getItem('products2')) || [];
        sessionStorage.setItem('products2',[]);
    }

    var htmlTx = '';
    for (var i = 0; i < products2.length; i++) {
        htmlTx += '<div class="product">'+
            '<img src="'+products2[i].image+'" alt="'+products2[i].name+'">'+
            '<h3 style="color:#EECC61;font-weight:bold;">'+products2[i].name+' - '+products2[i].color1+'</h3>'+
            '<p align="left"><b>£'+products2[i].price+'</b></p>'+
            '<p style="text-align:justify;">'+products2[i].desc+'</p>'+
            '<button style="background-color:#34516C; color:#fff; cursor:pointer;" onclick="addToCart(\''+products2[i].id+'\')">Add to Cart</button>'+
            '<button style="color:#34516C; cursor:pointer;" onclick="viewproductdetail('+products2[i].id+')">View Details</button>'+
            '</div>';
    }

    document.getElementById('products').innerHTML = htmlTx;
}

function obfuscateValue(value) {
    // Simple obfuscation algorithm
    const obfuscatedValue = value.toString().split('').map(char => char.charCodeAt(0)).join('');
    return obfuscatedValue;
}

function viewproductdetail(idobj) {
    if (idobj && idobj !== "") {

        var htmlTx = '';

        for (var i = 0; i < products2.length; i++) {
            if (products2[i].id === idobj) {
                htmlTx = '<div class="product2">' +
                    '<img src="' + products2[i].image + '" alt="' + products2[i].name + '">' +
                    '<h3 style="color:#EECC61;font-weight:bold;">' + products2[i].name +' - '+ products2[i].color1 + '</h3>' +
                    '<p align="left"><b>£'+products2[i].price+'</b></p>' +
                    '<p style="text-align:justify;">' + products2[i].desc + '</p>' +
                    '</div>';
            }
        }

        const products = document.getElementsByClassName('product');
        for (let i = 0; i < products.length; i++) {
            products[i].style.display = 'none';
        }

        document.getElementById('productDetails').innerHTML = htmlTx;
        document.getElementById('productDetails').style.display = 'block';
        document.getElementById('products2det').style.display = 'block';
        document.getElementById('clsxbtn').style.display = 'block';
        document.getElementById('pjnav').style.display = 'none';
    }
}
function closedetailpage(){
    document.getElementById('productDetails').innerHTML = '';
    document.getElementById('productDetails').style.display = 'none';
    document.getElementById('products2det').style.display = 'none';
    document.getElementById('clsxbtn').style.display = 'none';
    document.getElementById('pjnav').style.display = 'block';
    const products = document.getElementsByClassName('product');
    for (let i = 0; i < products.length; i++) {
        products[i].style.display = 'block';
    }
}

// JavaScript for the products page

function addToCart(product) {
    // Gets existing cart items from session storage or initialize an empty array
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Checks if the product is already in the cart
    const existingProduct = cartItems.find(item => item.id == product);

    if (existingProduct) {
        // If the product is already in the cart, increases the quantity
        existingProduct.quantity++;
    } else {
        // If the product is not in the cart, adds it with quantity 1
        cartItems.push({ id: product, quantity: 1 });
    }
    alert('Added in Cart successfully.');

    // Saves the updated cart items to session storage
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    // Updates the cart count in the header
    updateCartCount();
}

function updateCartCount() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
}

function filterProducts(category) {
    if(category && category!=""){
        if (category.toLowerCase() == "all") {
            document.getElementById('all').classList.add("active");
            document.getElementById('ts').classList.remove("active");
            document.getElementById('hd').classList.remove("active");
            document.getElementById('jp').classList.remove("active");
        }else if (category.toLowerCase() == "tshirt") {
            document.getElementById('ts').classList.add("active");
            document.getElementById('all').classList.remove("active");
            document.getElementById('hd').classList.remove("active");
            document.getElementById('jp').classList.remove("active");
        }else if (category.toLowerCase() == "hoodie") {
            document.getElementById('hd').classList.add("active");
            document.getElementById('all').classList.remove("active");
            document.getElementById('ts').classList.remove("active");
            document.getElementById('jp').classList.remove("active");
        }else if (category.toLowerCase() == "jumper") {
            document.getElementById('jp').classList.add("active");
            document.getElementById('all').classList.remove("active");
            document.getElementById('hd').classList.remove("active");
            document.getElementById('ts').classList.remove("active");
        }else{
            document.getElementById('all').classList.remove("active");
            document.getElementById('ts').classList.remove("active");
            document.getElementById('hd').classList.remove("active");
            document.getElementById('jp').classList.remove("active");
        }

    }

    const filteredProducts = (category === 'All') ? products2 : products2.filter(product => product.category.toLowerCase() == category.toLowerCase());
    var htmlTx = '';
    for (var i = 0; i < filteredProducts.length; i++) {
        htmlTx += '<div class="product">' +
            '<img src="' + filteredProducts[i].image + '" alt="' + filteredProducts[i].name + '">' +
            '<h3 style="color:#EECC61;font-weight:bold;">' + filteredProducts[i].name + ' - ' + filteredProducts[i].color1 + '</h3>' +
            '<p align="left"><b>£' + filteredProducts[i].price + '</b></p>' +
            '<p style="text-align:justify;">' + filteredProducts[i].desc + '</p>' +
            '<button style="background-color:#34516C; color:#fff; cursor:pointer;" onclick="addToCart(\'' + filteredProducts[i].id + '\')">Add to Cart</button>' +
            '<button style="color:#34516C; cursor:pointer;" onclick="viewproductdetail(' + filteredProducts[i].id + ')">View Details</button>' +
            '</div>';
    }

    document.getElementById('products').innerHTML = htmlTx;
}
