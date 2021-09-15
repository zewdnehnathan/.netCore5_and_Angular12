using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecifications<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductsSpecParams productsParams)
            :base(x=>
            (string.IsNullOrEmpty(productsParams.Search) || x.Name.ToLower().Contains(
                productsParams.Search)) && 
            (!productsParams.BrandId.HasValue || x.ProductBrandId== productsParams.BrandId) && 
            (!productsParams.TypeId.HasValue || x.ProductTypeId == productsParams.TypeId))
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productsParams.PageIndex * (productsParams.PageIndex - 1),
                productsParams.PageSize);

            if (!string.IsNullOrEmpty(productsParams.Sort)) 
            {
                switch (productsParams.Sort) 
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : 
            base(x=>x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
