import React from 'react';
function DownloadPage() {
    return ( <>
            <div className='container mt-4'>
                <h1 className='text-secondary'>Les Etapes pour telecharger les systeme sur votre ordinateur :</h1> 
                 <div className='card-body'>  
                    <h3> 1 - ouvrir le lien sur cette page <a target='c_blanc' href='/Login' >Page Initiale</a> </h3>
                    <h3> 2 - cliquer sur les toix point du navigateur (il est recommonde d'utiliser google chrome ) , puis selectionez "Enregistrer et partage" , puis cliquez sur Installer </h3>
                     
                    <img src='https://cdn.abyedh.com/Images/download/2.jpg' className='img-responsive' width='auto' height='auto' />
                    
                    <h3> 3 - Nommer l'application comme vous voulez, puis cliquer sur Installer </h3>
                    <img src='https://cdn.abyedh.com/Images/download/3.jpg' className='img-responsive' width='auto' height='auto' />
                    
                    <h3> 4 - si vous voulez ajouter le system a la barre des tache cliquer sur oui ici   </h3>
                    <img src='https://cdn.abyedh.com/Images/download/4.jpg' className='img-responsive' width='auto' height='auto' />

                    <h3> 5 - enfin vous devez trouver le system sur la barre des tache ou sur le bureaux    </h3>
                    <img src='https://cdn.abyedh.com/Images/download/5.jpg' className='img-responsive' width='auto' height='auto' />

                 </div>
            </div>
    </> );
}

export default DownloadPage;