import renderService from "@/core/services/render.service"
import template from './button.template.html'
import styles from './button.module.scss'
import ChildComponent from "@/core/component/child.component"
import { $R } from "@/core/rquery/rquery.libs"


export class Button extends ChildComponent {
    constructor({children, onClick, variant}) {
        super()

        if(!children) throw new Error('Children is empty!')
        this.children = children
        this.onClick = onClick
        this.variant = variant
    }
    
    render() {
      const element = renderService.htmlToElement(template, [], styles)
        this.element = element
        
        $R(this.element).html(this.children).click(this.onClick)
    
        if(this.variant) $R(this.element).addClass(styles[this.variant])

        return element
    }
}