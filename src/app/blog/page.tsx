import PostCard from "@/components/PostCard";
import { fetchAPI } from "@/helpers/fetch-api";
import { Post } from "@/interfaces/post";

const getPosts = async () => {
  const urlParamsObject = {
    populate: "*",
    sort: { createdAt: "asc" },
    pagination: { page: 1, pageSize: 4 },
  };

  const data = await fetchAPI("/posts", urlParamsObject);

  return data;
};

const Blog = async () => {
  const { data: posts, meta } = await getPosts();
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </section>
    </div>
  );
};
export default Blog;
