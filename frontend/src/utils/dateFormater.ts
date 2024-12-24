export function dateFormatter(dateString: string) {
   const [year, month, day] = dateString.split("-")
   const date = new Date(+year, +month - 1, +day)
    
   return new Intl.DateTimeFormat('en-US', {
        month: "short",
        year: "numeric",
        day: "numeric"
     }).format(date)
}