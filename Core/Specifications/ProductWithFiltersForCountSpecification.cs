using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecifications<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductsSpecParams productsParams)
             : base(x =>
             (!productsParams.BrandId.HasValue || x.ProductBrandId == productsParams.BrandId) &&
             (!productsParams.TypeId.HasValue || x.ProductTypeId == productsParams.TypeId))

        {

        }
    }
}
