using Prism.Commands;
using Prism.Regions;
using ProS.Wpf.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProS.Wpf.ViewModels
{
    class ZonesViewModel : BaseViewModel, INavigationAware
    {

        private string _state = "ddd";
        public string State
        {
            get
            {
                return _state;
            }
            set
            {
                SetProperty(ref _state, value);
            }
        }

        private IRegionManager _regionManager;
        public ZonesViewModel(IRegionManager regionManager)
        {
            _regionManager = regionManager;
            regionManager.RegisterViewWithRegion("ZonesRegion", typeof(Views.Safety.SafetyZones));
            regionManager.RegisterViewWithRegion("ZonesRegion", typeof(Views.Safety.Parameters));
            ToZones = new DelegateCommand(() =>
            {
                _regionManager.RequestNavigate("ZonesRegion", "SafetyZones");
            });
            ToParameters = new DelegateCommand(() =>
            {
                _regionManager.RequestNavigate("ZonesRegion", "Parameters");
            });
        }
        public DelegateCommand ToZones { get; set; }
        public DelegateCommand ToParameters { get; set; }

        public bool IsNavigationTarget(NavigationContext navigationContext)
        {
            return true;
        }

        public void OnNavigatedFrom(NavigationContext navigationContext)
        {
        }

        public void OnNavigatedTo(NavigationContext navigationContext)
        {
        }
    }
}
