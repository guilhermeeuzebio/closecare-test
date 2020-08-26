export class DataValidator {    
    public static verificaData(date: string, permiteDataFutura: boolean) {
        let year
        let month
        let day

        // Verifica se é do tipo string
        if (typeof(date) === 'string') {
            // Verifica se tem '/' ou não
            if (date.indexOf('/') > -1) {
                let str = date.split('/')
                year = Number(str[2])
                month = Number(str[1]) - 1
                day = Number(str[0])
            } else {
                day = Number(date[0] + date[1])
                month = Number(date[2] + date[3]) - 1
                year = Number(date[4] + date[5] + date[6] + date[7])   
            }
        
            // Tenta criar a data a partir dos campos
            try {
                let data = new Date(year, month, day)

                if ( (data.getFullYear() === year) && (data.getMonth() === month ) && (data.getDate() === day) ){

                    if (!permiteDataFutura && data > new Date()) {
                        return null
                    }
                    return data;
                } else {
                    return null
                }
            }
            finally {}
        }
    }
}