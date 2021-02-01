import { useFetchData } from "hooks/useFetchData"
import { RouteComponentProps } from "react-router-dom"

type MatchParams = {
    slug: string;
}
type ViewRecipeProps = RouteComponentProps<MatchParams>

function ViewRecipe(props: ViewRecipeProps) {
    const { slug } = props.match.params

    const { response, loadingStatus } =  useFetchData({ url: `/api/recipe/${slug}`, method: 'GET'})

    return <p>{slug}</p>
}

export default ViewRecipe