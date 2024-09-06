
const usePrintFunction = (frameId) => {
    setTimeout(() => {
        document.getElementById(frameId).contentWindow.window.print();
    }, 5000);  
    
};

export default usePrintFunction;