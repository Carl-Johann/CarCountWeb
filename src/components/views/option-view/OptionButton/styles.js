import { design } from '../../../../config/style'

export const styles = {
    button: {
        height: '200px',
        marginTop: '10vw',
        radius: design.radius,
        boxShadow: '9px 7px 90px 2px rgba(0,0,0,0.16)',
        MozBoxShadow: '9px 7px 90px 2px rgba(0,0,0,0.16)',
        WebkitBoxShadow: '9px 7px 90px 2px rgba(0,0,0,0.16)',
    },

    picTextPadding: {
        padding: '10px'
    }

}






// cols
const col = 'col-10 offset-1'
const col_md = 'col-lg-3 offset-lg-2'
const col_lg = 'col-lg-3 offset-lg-2'

export const cols = {
    buttons: col.concat(' ', col_md, ' ', col_lg)
}