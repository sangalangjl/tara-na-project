Rails.application.routes.draw do
    resources :user_trips, only: [:create, :destroy]
    resources :user_events, only: [:create, :update, :destroy]
    resources :events
    resources :trips, only: [:index, :show, :create, :destroy]
  # resources :users
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
