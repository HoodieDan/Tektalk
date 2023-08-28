<template>
    <div class="container" >
      <ProfileSkeleton v-if='profile === null' />
      <div class="profile-container w-100" v-else >
          <!-- backdrop image  -->
          <div class="backdrop-image w-100">
              <div v-if="profile.backdropUrl !== null">
                  <img
                   :src="profile.backdropUrl" 
                   alt="backdrop image" 
                   class="img-fluid" 
                   @click="openImage(profile.backdropUrl)" 
                  >
              </div>
          </div>
          <div class="cover">
              <!-- display image  -->
              <div class="circular" v-motion-pop >
                  <img
                   :src="profile.displayUrl" 
                   :alt="profile.name" 
                   v-if="profile.displayUrl !== null" 
                   @click="openImage(profile.displayUrl)" 
                  >
                  <img
                   src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png"
                   :alt="profile.name"
                   @click="openImage('https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png')" 
                   v-else
                  >
              </div>
          </div>
          <div class="row info">
  
              <!-- name, verification badge and username  -->
              <div class="name-and-username col-7">
                  <div class="d-flex align-items-center">
                      <h4 class="name mb-0"  v-motion-pop >{{ profile.name }}</h4>
                      <div class="badge" v-if="profile.isVerified" v-motion-pop >
                          <svg
                              width="17px"
                              height="17px"
                              fill="#d9d9d9"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              aria-label="Verification badge"
                              class="
                              r-jwli3a
                              r-4qtqp9
                              r-yyyyoo
                              r-1xvli5t
                              r-9cviqr
                              r-f9ja8p
                              r-og9te1
                              r-bnwqim
                              r-1plcrui
                              r-lrvibr
                              "
                          >
                              <g>
                              <path
                                  d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
                              />
                              </g>
                          </svg>
                      </div>
                  </div>
                  <p class="username" v-motion-pop >@{{ profile.username }}</p>
              </div>
              <div class="follow col-5" v-if="loggedInUser !== null" >
                  <!-- follow button  -->
                  <!-- <button class="talk-btn w-100" v-if="profile.username !== loggedInUser.username && profile.isFollowing === false" :disabled="follow_in_progress" v-motion-pop @click="follow">
                      <p class="other-talks mb-0" v-if="!follow_in_progress" >Follow</p>
                      <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                  </button> -->
                  <!-- unfollow button  -->
                  <!-- <button class="talk-outline-btn w-100" v-if="profile.username !== loggedInUser.username && profile.isFollowing === true" :disabled="follow_in_progress" v-motion-pop @click="unfollow">
                      <p class="other-talks mb-0" v-if="!follow_in_progress" >Unfollow</p>
                      <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                  </button> -->
                  <!-- edit profile button -->
                  <!-- <router-link :to="{ name: 'EditProfile' }" class="no-underline light talk-btn" v-motion-pop v-if="profile.username === loggedInUser.username">
                      <p class="mb-0 other-talks"><i class="light fa-solid fa-pen-nib"></i><span>Edit Profile</span></p>
                  </router-link> -->
                  <p class="subtext mb-0 ms-2" v-if="profile.isFollowedBy && loggedInUser !== null" >Follows you</p>
              </div>
  
              <!-- stack -->
              <div class="stack" v-motion-pop >
                  <i class="fa-solid fa-code"></i>
                  <p class="mb-0">{{ profile.stack }}</p>
              </div>
  
              <!-- location  -->
              <div class="location" v-motion-pop >
                  <i class="fa-solid fa-location-dot"></i>
                  <p class="mb-0">{{ profile.location }}</p>
              </div>
  
              <!-- email  -->
              <div class="location" v-motion-pop >
                  <i class="fa-regular fa-envelope normal-fa"></i>
                  <a :href="'mailto:' + profile.email" class="mb-0 dark no-underline">{{ profile.email }}</a>
              </div>
  
              <!-- user bio  -->
              <div class="bio mt-3" v-if="profile.bio !== 'null'" v-motion-pop >
                  <p class="bio">{{ profile.bio }}</p>
              </div>
              
              <router-link :to="{ name: 'Profile', params: { username: profile.username } }" class="text-gradient no-underline">
                see more 
                <!-- <i class="fa-solid fa-arrow-right no-hover"></i> -->
              </router-link>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import PageLoader from '../components/PageLoader.vue'
  import ProfileSkeleton from '../components/ProfileSkeleton.vue'
  import axios from 'axios'
  import { postStore } from '../stores/post';
  import { authStore } from '../stores/auth';
  
  export default {
      async created() {
          const apiKey = import.meta.env.VITE_API_KEY;
          const auth = authStore();
  
          let user_profile;
          try {
              user_profile = await axios.get(`/profile/id/${this.$route.params.id}?apiKey=${apiKey}`);
          } catch (error) {    
              this.$toast.error('Error occured while fetching user details.')
          }
  
            this.loggedInUser = auth.user;
            this.profile = user_profile.data;
      },
      data() {
          return {
              profile: null,
              loggedInUser: null,
              color: 'FFF',
              follow_in_progress: false,
              following: false,
              number: 0,
          }
      },
      methods: {
          openImage(image) {
              const post = postStore();
  
              post.viewImage(image)
          },
          async follow() {
              const apiKey = import.meta.env.VITE_API_KEY;
              if (this.loggedInUser === null) {
                  this.$router.push({ name: 'Auth' })
                  return;
              }
              this.follow_in_progress = true;
              let followed;
              try {
                  followed =  await axios.put(`/follow?apiKey=${apiKey}&userId=${this.profile.userId}`)
              } catch (error) {
                  this.follow_in_progress = false;
                  this.$toast.error(error.response.data.message);
                  return;
              }
              this.follow_in_progress = false;
              // check if following then update button content to following 
              this.profile.isFollowing = true;
              this.profile.followersCount += 1;
              this.$toast.success('Followed successfully');
          },
          async unfollow() {
              const apiKey = import.meta.env.VITE_API_KEY;
              // if (this.loggedInUser === null) {
              //     this.$router.push({ name: 'Auth' })
              //     return;
              // }
              this.follow_in_progress = true;
              let unfollowed;
  
              try {
                  unfollowed =  await axios.patch(`/unfollow?apiKey=${apiKey}&userId=${this.profile.userId}`);
              } catch (error) {
                  this.follow_in_progress = false;
                  this.$toast.error(error.response.data.message);
                  return;
              }
              this.follow_in_progress = false;
              // check if following then update button content to following 
              this.profile.isFollowing = false;
              this.profile.followersCount -= 1;
              this.$toast.success('Unfollowed successfully');
          },
      },
      computed: {
          currentRoute() {
              return this.$route.params.username;
          },
      },
      components: { PageLoader, ProfileSkeleton },
  }
  </script>
  
  <style scoped>
  div.profile-container {
      border-radius: 5px;
      background-color: #000;
      position: relative;
      max-height: 85vh;
  }
  div.backdrop-image {
      border-bottom: 3px solid #e7e9ea;
      min-height: 100px;
  }
  div.backdrop-image img {
      width: 100%;
      object-fit: cover;
      height: 100px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      cursor: pointer;
  }
  div.cover {
      height: 50px;
  }
  div.circular {
      width: 100px;
      height: 100px;
      border: 3px solid #e7e9ea;
      position: relative;
      left: 50px;
      bottom: 50px;
      cursor: default;
  }
  div.info {
      padding: 1rem;
  }
  .name {
      font-weight: 600;
  }
  .username {
      font-weight: 500;
      background: linear-gradient(to right, #20BF55, #01BAEF);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      cursor: pointer;
  }
  .circular img {
      cursor: pointer;
  }
  .stack, .location {
      display: flex;
      color: #A9A9A9;
      align-items: center;
      font-size: 0.6rem;
  }
  .stack > *, 
  .location > * {
      font-size: 0.7rem;
  }
  .bio {
    font-size: 0.8rem;
  }
  .fa-solid {
      background-color: transparent;
      color: #A9A9A9;
      cursor: default;
  }
  a.dark.no-underline:hover {
      color: #A9A9A9;
      text-decoration: underline;
      text-decoration-color: #20BF55;
  }
  .subtext {
    margin-top: 1rem;
    font-size: 0.5rem;
  }
  .text-gradient.no-underline {
    font-size: 0.8rem;
  }
  @media (max-width: 575px) {
      .container {
          padding-left: 0;
          padding-right: 0;
      }
      .info {
          margin-right: 0;
          margin-left: 0;
      }
      div.info {
          padding: 1.5rem 30px;
      }
  }
  @media (max-width: 400px) {
      .circular {
          left: 30px;
      }
      .other-talks span {
          display: none;
      }
  }
  </style>