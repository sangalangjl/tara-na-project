class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    
    before_action :confirm_authentication
    
    private

    # def authorize
    #     @current_user = User.find_by(id: session[:user_id])
    #     render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    # end

    def current_user
        @current_user ||= session[:user_id] && User.find_by_id(session[:user_id])
    end
    
    def confirm_authentication
        render json: { error: "You must be logged in to do that." }, status: :unauthorized unless current_user
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_record_not_found
        render json: { error: "Record not found" }, status: :not_found
    end

end
