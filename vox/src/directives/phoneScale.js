export const phoneScale = (el, binding) => {
    if(binding.value.isPopup) {
        el.style.top = `calc(50% * ${binding.value.devicePixelRatio})`
        el.style.left = `calc(50% * ${binding.value.devicePixelRatio})`
        // el.style.top = 0
        // el.style.left = 0
    }
}
