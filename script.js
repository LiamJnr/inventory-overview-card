const container = document.querySelector('.container');
console.log(container);

const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries){
        const { width, height } = entry.contentRect;
        console.log(`container resized: ${width}px and ${height}px`);
    }
})

resizeObserver.observe(container);