import { getStrapiURL } from "@/helpers/api-helpers";
import { fetchAPI } from "@/helpers/fetch-api";
import { Post } from "@/interfaces/post";
import Image from "next/image";

interface Props {
  params: {
    slug: string;
  };
}

const getPost = async (slug: string) => {
  const urlParamsObject = {
    populate: "image",
    filters: { slug: slug },
  };

  const { data } = await fetchAPI("/posts", urlParamsObject);

  return data[0];
};

const SlugBlog = async ({ params }: Props) => {
  const { slug } = params;
  const post: Post = await getPost(slug);

  const { title, createdAt, description, image } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.large;
  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-extrabold dark:text-white">{title}</h1>
      <Image
        className="h-auto max-w-lg rounded-lg"
        src={getStrapiURL(url)}
        alt="image description"
        width={width}
        height={height}
      />
      <p>{description}</p>
    </div>
  );
};
export default SlugBlog;
