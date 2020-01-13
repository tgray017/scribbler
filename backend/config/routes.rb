Rails.application.routes.draw do

  resources :rounds do
    resources :guessed_words
  end
  resources :games
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
