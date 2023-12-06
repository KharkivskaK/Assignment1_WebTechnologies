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

        // Assuming your CSV has columns in the order: id, name, price, image
        for (let i = 0; i < lines.length; i++) {
          const [id, name, color2, descr, price, images] = lines[i].split(',');

          if(images && images!="" && id && id!=""){
            products.push({
                id: parseInt(id),
                name: name,
                color1: color2,
                desc: descr,
                price: price,
                image: images.trim(), // Remove extra spaces
              });
          }
        }


          return products;
        }

        // Fetch CSV and update products
        fetchCSV()
          .then(parseCSV)
          .then(products => {
            // Use the products array to update your page or perform other actions
            // console.log(products);
            products2 = products;
            sessionStorage.setItem('products1',JSON.stringify(products2));
          })
          .catch(error => {
            console.log(error);
          });

window.onload = function () {
    if(sessionStorage.getItem('products1')){
        products2 = JSON.parse(sessionStorage.getItem('products1')) || [];
        sessionStorage.setItem('products1',[]);
    }
    
// Function to update cart details
function updateCartDetails() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    // Display cart details in the cart page
    const cartContainer = document.getElementById('cart-container');

    // Reset the cart container
    cartContainer.innerHTML = '';

    // Initialize variables for total count and price
    let totalCount = 0;
    let totalPriceValue = 0;

    var HtmlTXT1 = '';
    // Iterate through each item in the cart
    cartItems.forEach(item => {
        for (var i = 0; i < products2.length; i++) {
            if(products2[i].id==item.id){
                
                HtmlTXT1 += '<tr><td><img width="50px" src="'+products2[i].image+'" alt="'+products2[i].name+'"></td>'+
                    '<td>'+
                        '<h3>'+products2[i].name+' - '+products2[i].color1+'</h3>'+
                    '</td>'+
                    '<td>'+
                        '<p>'+products2[i].price+'</p>'+
                    '</td>'+
                    '<td>'+
                        '<p>'+item.quantity+'</p>'+
                    '</td>'+
                    '<td>'+
                        '<button style="color:#34516C; cursor:pointer;" onclick="removeFromCart('+item.id+')">Remove</button>'+
                    '</td>'+
                    '</tr>';

                totalCount += item.quantity;
                totalPriceValue += products2[i].price * item.quantity;
            }
        }
    });
    HtmlTXT1 += '<tr><td colspan="2"><b>Total</b></td>'+
                    '<td>'+totalPriceValue.toFixed(2)+'</td>'+
                    '<td>'+totalCount+'</td>'+
                    '</tr>';
    HtmlTXT1Header = '<thead><tr>'+
                        '<th>&nbsp;</th>'+
                        '<th>Product Name</th>'+
                        '<th>Product Price</th>'+
                        '<th>Product Qty</th>'+
                        '<th>Action</th>'+
                      '</tr></thead>';
    cartContainer.innerHTML = '<center><table border="1" cellspacing="5" cellpadding="10">'+HtmlTXT1Header+HtmlTXT1+'</table></center>';
    // Update total count and price
}

updateCartDetails();
}

function removeFromCart(productId) {
    // Get existing cart items from session storage or initialize an empty array
    let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex(item => item.id == productId);

    if (existingProductIndex !== -1) {
        // If the product is in the cart, decrease the quantity
        cartItems[existingProductIndex].quantity--;

        // If the quantity becomes zero, remove the item from the cart
        if (cartItems[existingProductIndex].quantity === 0) {
            cartItems.splice(existingProductIndex, 1);
        }

        alert('Removed from Cart successfully.');
        window.location.reload();
    } else {
        alert('Product not found in Cart.');
    }

    // Save the updated cart items to session storage
    sessionStorage.setItem('cart', JSON.stringify(cartItems));

    // Update the cart count in the header
    updateCartCount();
}
