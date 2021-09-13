using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public int statusCode { get; set; }
        public string message { get; set; }

        public ApiResponse(int statuscode,string message=null)
        {
            statusCode = statuscode;
            this.message = message ?? GetDefaultMessageForStatusCode(statuscode);
        }

        private string GetDefaultMessageForStatusCode(int statuscode)
        {
            return statuscode switch
            {
                400 => "A bad, request you have made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Errors lead to anger." +
                "anger leads to hate. Hate leads to career change",
                _ => null
            };
        }

    }
}
