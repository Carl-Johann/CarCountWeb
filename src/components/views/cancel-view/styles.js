

export const styles = {
    container: {
        marginTop: '10vh',
    },

    input: {
        // height: '100px'
        cols: 50,
        rows: 10
    },


    postButton: {
        marginTop: '3vh',
        height: 50,
    },


    postButtonText: {
        marginBottom: 0,
    },



    loader: {
        border: '4px solid #f3f3f3', /* Light grey */
        borderTop: '4px solid #3498db', /* Blue */
        borderRadius: '50%',
        width: 40,
        height: 40,
        animation: 'spin 2s linear infinite',
    },

    loaderContainer: {
        marginTop: '3vh',
        left: -40
    },


    titleText: {
        textAlign: 'center',
        paddingTop: '4vh',
        paddingBottom: '4vh',

    },

    fullwidth: {
        width: '100%'
    },


}






// cols
const col = 'col-10 offset-1'
const col_md = 'col-md-8 offset-md-2'
const col_lg = 'col-lg-6 offset-lg-3'

const col_post = 'col-1 offset-6'
const col_md_post = 'col-md-1 offset-md-6'
const col_lg_post = 'col-lg-1 offset-lg-6'



export const cols = {
    input: col.concat(' ', col_md, ' ', col_lg),
    titleText: col.concat(' ', col_md, ' ', col_lg),
    postButton: col.concat(' ', col_md, ' ', col_lg),
    loader: col_post.concat(' ', col_md_post, ' ', col_lg_post),
}