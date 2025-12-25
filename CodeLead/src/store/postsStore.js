import { create } from "zustand";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../services/posts.service.js";

/**
 * Number of posts loaded per page (pagination size)
 */
const PAGE_SIZE = 10;

/**
 * Posts store
 * Handles:
 * - Fetching posts
 * - Pagination & filtering
 * - Likes & comments (frontend-only)
 * - CRUD operations
 */
const usePostsStore = create((set, get) => ({
  /* =======================
     STATE
  ======================== */

  posts: [], // Posts currently visible in the UI
  allPosts: [], // Full list of posts (used for filtering & pagination)
  isLoading: false, // Global loading state
  page: 1, // Current page number
  hasMore: true, // Indicates if more posts can be loaded
  filter: "", // Search filter text

  /* =======================
     FETCH POSTS
  ======================== */

  /**
   * Fetches posts from the API
   * Normalizes missing fields and initializes pagination
   */
  fetchPosts: async () => {
    set({ isLoading: true });

    const posts = await getPosts();

    // Normalize posts to ensure required fields always exist
    const normalizedPosts = posts.map((post) => ({
      ...post,
      likes: post.likes ?? 0,
      likedBy: post.likedBy ?? [],
      comments: post.comments ?? [],
    }));

    set({
      allPosts: normalizedPosts,
      page: 1,
      isLoading: false,
    });

    // Apply initial pagination & filtering
    get().applyFilterAndPagination();
  },

  /* =======================
     FILTERING & PAGINATION
  ======================== */

  /**
   * Applies text filtering and pagination
   * This is the core logic that updates the visible posts
   */
  applyFilterAndPagination: () => {
    const { allPosts, page, filter } = get();

    // Filter posts by title, content or username
    const filtered = filter
      ? allPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(filter.toLowerCase()) ||
            post.content.toLowerCase().includes(filter.toLowerCase()) ||
            post.username.toLowerCase().includes(filter.toLowerCase())
        )
      : allPosts;

    // Slice posts based on current page
    const paginated = filtered.slice(0, page * PAGE_SIZE);

    set({
      posts: paginated,
      hasMore: paginated.length < filtered.length,
    });
  },

  /**
   * Loads the next page of posts
   * Used for infinite scroll or "Load more" button
   */
  loadNextPage: () => {
    set((state) => ({ page: state.page + 1 }));
    get().applyFilterAndPagination();
  },

  /**
   * Updates the search filter
   * Resets pagination when filter changes
   */
  setFilter: (value) => {
    set({ filter: value, page: 1 });
    get().applyFilterAndPagination();
  },

  /* =======================
     USER INTERACTIONS
  ======================== */

  /**
   * Toggles like/unlike for a post
   * This is a frontend-only interaction
   */
  toggleLike: (postId, userName) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id !== postId) return post;

        const hasLiked = post.likedBy.includes(userName);

        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1,
          likedBy: hasLiked
            ? post.likedBy.filter((u) => u !== userName)
            : [...post.likedBy, userName],
        };
      }),
      allPosts: state.allPosts.map((post) => {
        if (post.id !== postId) return post;

        const hasLiked = post.likedBy.includes(userName);

        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1,
          likedBy: hasLiked
            ? post.likedBy.filter((u) => u !== userName)
            : [...post.likedBy, userName],
        };
      }),
    })),

  /**
   * Adds a comment to a post (frontend-only)
   */
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
      allPosts: state.allPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    })),

  /* =======================
     CRUD OPERATIONS
  ======================== */

  /**
   * Creates a new post
   * Normalizes interaction fields for frontend usage
   */
  addPost: async (post) => {
    const newPost = await createPost(post);

    const normalized = {
      ...newPost,
      likes: 0,
      likedBy: [],
      comments: [],
    };

    set((state) => ({
      allPosts: [normalized, ...state.allPosts],
      page: 1,
    }));

    get().applyFilterAndPagination();
  },

  /**
   * Deletes a post by id
   */
  removePost: async (id) => {
    await deletePost(id);

    set((state) => ({
      allPosts: state.allPosts.filter((p) => p.id !== id),
    }));

    get().applyFilterAndPagination();
  },

  /**
   * Updates an existing post
   */
  updatePost: async (id, payload) => {
    const updated = await updatePost(id, payload);

    set((state) => ({
      allPosts: state.allPosts.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    }));

    get().applyFilterAndPagination();
  },
}));

export default usePostsStore;
