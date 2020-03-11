// class Produit
class Product {
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year
    }
}

// Class échange avec HTML
class Interface{

    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>:${product.name}
                    <strong>Product Price</strong>:${product.price}
                    <strong>Product Year</strong>:${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){

        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product deleted success', 'danger');
            
        }
    }

    showMessage(message,cssClass){
        const div =document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Montrer dans le DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }
}

// événement du DOM ou HTML (click,mouse...)
document.getElementById('product-form').addEventListener("submit", function(e){
   const name = document.getElementById('name').value;
   const price = document.getElementById('price').value;
   const year = document.getElementById('year').value;

   const product = new Product(name,price,year);

   const interface = new Interface();

   if(name === '' || year === '' || price === ''){
        return interface.showMessage('Complete fields please', 'warning');
   }

   interface.addProduct(product);
   interface.resetForm();
   interface.showMessage('Producted added success', 'success')
   
    e.preventDefault();  
})

document.getElementById('product-list').addEventListener('click', function(e){
    const interface = new Interface();
    interface.deleteProduct(e.target)
})
