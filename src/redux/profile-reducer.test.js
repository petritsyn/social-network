import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hello!', likesCount: 15},
        {id: 2, message: 'Hi, how are you?', likesCount: 12},
        {id: 3, message: 'Second post', likesCount: 10},
        {id: 4, message: 'Its my first post.', likesCount: 11}
    ]
};

test('quantity of posts is incremented', () => {

    // test data
    let action = addPost('Hello');

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(5);
});

test('check the text of post', () => {

    // test data
    let action = addPost('Hello');

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts[4].message).toBe('Hello');
});

test('delete post', () =>{

    // test data
    let action = deletePost(1);

    // action
    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(3);
});