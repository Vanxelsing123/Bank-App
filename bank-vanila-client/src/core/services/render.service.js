import ChildComponent from "../component/child.component"

class RenderService {
    
    htmlToElement(html, components = [], styles) {
       const parser = new DOMParser()
       const doc = parser.parseFromString(html, 'text/html')
       const element = doc.body.firstChild

       if(styles){
        this.#applyModuleStyles(styles, element)
       }

       this.#replaceComponentTags(element, components)

       return element
    }

    #replaceComponentTags(parentElement, components) {
        const componentTagPattern = /^component-/
        const allElemnts = parentElement.getElementsByTagName('*')

        for (const element of allElemnts) {
            const elementTagName = element.tagName.toLowerCase()
            if(componentTagPattern.test(elementTagName)) {
                const componentName = elementTagName
                .replace(componentTagPattern, '')
                .replace(/-/g, '')

                const foundComponent = components.find(Component => {
                    const instance =
                    Component instanceof ChildComponent ? Component : new
                    Component()

                    return instance.constructor.name.toLowerCase() ===
                    componentName
                })

                if (foundComponent) {
                    const componentContent =
                    foundComponent instanceof ChildComponent
                    ? foundComponent.render()
                    : new foundComponent().render()
                    element.replaceWith(componentContent)
                } else {
                    console.error(
                        `Component "${componentName}" not found in the provided components array`
                    )
                }
            }
        }

        
        
    }

    #applyModuleStyles(moduleStyles, element) {
        if(!element) return

        const applyStyles = element => {
            for(const [key, value] of Object.entries(moduleStyles)){
                if(element.classList.contains(key)) {
                    element.classList.remove(key)
                    element.classList.add(value)
                }
            }
        }
        if(element.getAttribute('class')){
            applyStyles(element)
        }
        const elements = element.querySelectorAll('*')
        elements.forEach(applyStyles)
    }

}

export default new RenderService()