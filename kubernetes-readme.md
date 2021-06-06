# Kubernetes toturial
    https://www.youtube.com/watch?v=X48VuDVv0do&t=323s
    brew update
    brew install hyperkit
    brew install minikube (minikube has kubectl has dependency)
    minikube start --vm-driver=hyperkit

    -----------
# Create a POD
    kubectl create deployment nginx-del --image=nginx    
    kubectl edit deployment nginx-del
    kubectl get deployment
    kubectl get deployment nginx-del -o yaml > (i will get the updated configuration of my deplyment ,which reside at etcd[brain])
    kubectl get replicaset
    kubectl get pod
    kubectl get pod -o wide (for more information)
    kubectl get services
    kubectl get secret
    kubectl get namespace
    kubectl get ingress
    kubectl delete deployment nginx-del (replicaset and the pod will gone)
    minikube service mongodb-exp-service (to execute the app)

# If the pod is not coming up
    kubectl describe pod pod_name
    kubectl describe service service_name
    