import { design, colors } from '../../../config/style'


export const styles = {

    confirm: {
        height: 140,
        marginTop: '25vh',
        padding: 15,
    },

    button: {
        marginTop: '7.5vh',
        height: 50
    },

    loader: {
        border: '4px solid #f3f3f3', /* Light grey */
        borderTop: '4px solid #3498db', /* Blue */
        borderRadius: '50%',
        marginTop: '7.5vh',
        width: 40,
        height: 40,
        animation: 'spin 2s linear infinite',
    },

    loadingContainer: {
        left: -40
    }

}





// cols
const col = 'col-8 offset-2'
const col_md = 'col-md-4 offset-md-4'
const col_lg = 'col-lg-4 offset-lg-4'

const col_load = 'col-1 offset-6'
const col_md_load = 'col-md-1 offset-md-6'
const col_lg_load = 'col-lg-1 offset-lg-6'

export const cols = {
    confirm: col.concat(' ', col_md, ' ', col_lg, ' '),
    loader: col_load.concat(' ', col_md_load, ' ', col_lg_load, ' '),
}