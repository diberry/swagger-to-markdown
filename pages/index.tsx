import { NextPage } from 'next';
import { useState } from "react"
import { swaggerToMarkdown } from '../service/conversion'

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {

    console.log("home")


    const [swagger, setSwagger] = useState("{}")
    const [markdown, setMarkdown] = useState(swagger)
    //const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {

        /*event.preventDefault()
        const jsonValue = event?.currentTarget?.value?.toString()
        let convertedMarkdown: string = "";
        convertedMarkdown = swaggerToMarkdown(jsonValue)
        setMarkdown(convertedMarkdown);
*/
        //console.log("submit pressed")
      //}

      const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> => {
        console.log("buton clicked")
        e.preventDefault()

        if(swagger){

            const convertedMarkdown = swaggerToMarkdown(swagger)
            console.log(JSON.stringify(convertedMarkdown))
            setMarkdown(convertedMarkdown);

        }

      }
      const handleSwaggerTextAreaChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.log("handleSwaggerTextAreaChange changed")

        const localVal = event.currentTarget.value
        setSwagger(localVal)

      }


    return (
        <div>
            <form onSubmit={handleSubmit} noValidate={true}>
            <div>Swagger</div>
            <div>
                <input
                  value={swagger}
                  type="text"
                  placeholder=""
                  onChange={handleSwaggerTextAreaChange}
                  onBlur={handleSwaggerTextAreaChange}
                />
            </div>
            <div><button type="submit">Convert</button></div>
            </form>
            <div>Markdown</div>
            <div>{markdown}</div>
        </div>

      )

    };

  Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    return { userAgent };
  };



  export default Home;