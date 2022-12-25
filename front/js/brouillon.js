
     const article = canapé;
    
      //  Pour cibler l'élément
      document.querySelector('.item_img').textContent = article.img
      document.querySelector('#title').textContent = article.title
      document.querySelector('#price').textContent = article.price
      document.querySelector('#description').textContent = article.description
      document.querySelector('#colors').textContent = article.colors
      document.querySelector('#quantity').textContent = article.quantity
      
      //pour creer limage titre et la description et le prix
      const afficherImg = document.createElement("img")
      afficherImg.setAttribute('id', 'productImg');
      afficherImg.src = product.imageUrl;
      toContainimg.appenChild(afficherImg);

      title.innerText =  product.name;
      description.innerText = product.descritpion;
      price.innerText = product.price;


      // Pour accéder aux valeurs dc des couleurs du produit (marche que sur les tableaux, pour parcourir les éléments)
      for (let color of product.color) {
      const option = document.createElement('option');
      option.value = color;
      option.innerText = color;
      colorInput.appendChild(option);
      }
  


const articleID = getArticleID();
    getArticleID(articleID);
   
