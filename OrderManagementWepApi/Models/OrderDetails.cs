using System;
using System.Collections.Generic;

namespace OrderManagementWepApi.Models
{
    public partial class OrderDetails
    {
        public int OrderId { get; set; }
        public string ClientName { get; set; }
        public string Itemcategory { get; set; }
        public string Itemname { get; set; }
        public int? ItemQuantity { get; set; }
    }

    public class OrderList
    {
       public IEnumerable<OrderDetails> Order { get; set; } 
    }
}
